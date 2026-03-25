import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HeroService } from '../../hero/services/hero';
import { createGoblin, createHero, Enemy, GameStatus } from '../../hero/models/hero';
import { LoggerService } from '../../../shared/services/logger';
import { GAME_CONFIG } from '../../../shared/tokens/game-config';
import { ItemService } from '../../item/services/item';
import { getHpStatus } from '../../../shared/utils/hp.utils';
import { GameStateService } from '../../../shared/services/game-state';
import { GameState } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly heroService = inject(HeroService);
  private readonly loggerService = inject(LoggerService);
  private readonly itemService = inject(ItemService);
  private readonly config = inject(GAME_CONFIG);
  private gameStateService = inject(GameStateService);

  readonly enemiesDefeated = signal<number>(0);
  readonly history = signal<string[]>([]);
  readonly gameStatus = signal<GameStatus>(GameStatus.STOP);

  readonly enemy = signal<Enemy>(createGoblin(0));
  readonly enemyStatus = computed(() => {
    return getHpStatus(this.enemy().hp, this.enemy().hpMax!);
  });

  readonly enemyHpPercent = computed(() => {
    return (this.enemy().hp / this.enemy().hpMax!) * 100;
  });

  readonly isReady = computed(() => {
    return this.heroService.hpPercent() >= 30 && this.itemService.items().length > 0;
  });

  constructor() {
    effect(() => {
      this.loggerService.log(`Game status changed: ${this.gameStatus()}`);
      if (this.gameStatus() !== GameStatus.STOP) {
          this.gameStateService.save(this.getGameState());
      }
    });
  }

  getGameState(): GameState {
    return {
      hero: this.heroService.hero(),
      enemy: this.enemy(),
      gameStatus: this.gameStatus(),
      enemiesDefeated: this.enemiesDefeated(),
      history: this.history(),
      items: this.itemService.items(),
    }
  }

  loadGameState(): void {
    const savedState = this.gameStateService.state();
    
    if (!savedState || !savedState.hero) {
      this.loggerService.log('No saved game state found');
      return;
    }

    this.loggerService.log('Restoring game state from storage');
    this.heroService.hero.set(savedState.hero);
    this.enemy.set(savedState.enemy);
    this.gameStatus.set(savedState.gameStatus);
    this.enemiesDefeated.set(savedState.enemiesDefeated);
    this.history.set(savedState.history);
    this.itemService.setItems(savedState.items);
  }

  enemyTakeDamage(amount: number) {
    this.enemy.update((enemy) => ({
      ...enemy,
      hp: Math.max(enemy.hp - amount, 0),
    }));
  }

  startGame() {
    this.loggerService.log('Game started');
    this.enemiesDefeated.set(0);
    this.heroService.hero.set(createHero());
    this.enemy.set(createGoblin(this.enemiesDefeated()));
    this.itemService.initItems();
    this.gameStatus.set(GameStatus.PLAYING);
    this.history.set([]);
  }

  stopGame() {
    this.loggerService.log('Game stopped');
    this.gameStatus.set(GameStatus.STOP);
  }

  restartGame() {
    this.loggerService.log('Game restarted');
    this.startGame();
  }

  nextLevel() {
    this.loggerService.log('Moving to the next level');
    let currentHero = this.heroService.hero();
    this.enemiesDefeated.update((count) => count + 1);
    this.enemy.set(createGoblin(this.enemiesDefeated()));
    this.heroService.updateHp(
      (this.heroService.hero().hpMax - currentHero.hp) * this.config.healMultiplier,
    );
    this.heroService.updateLevel(1);
    this.gameStatus.set(GameStatus.PLAYING);
    this.history.set([]);
  }

  private calculateDamage(attack: number): { damage: number; isCrit: boolean } {
    const isCrit = Math.random() < this.config.critChance;
    const damage =
      Math.floor(Math.random() * (attack + 1)) * (isCrit ? this.config.baseDamageMultiplier : 1);
    return { damage, isCrit };
  }

  attack() {
    const currentHero = this.heroService.hero();
    const currentEnemy = this.enemy();
    const heroAttack = this.calculateDamage(currentHero.attack);

    this.history.update((hist) => [
      ...hist,
      `You dealt ${heroAttack.damage} damage${heroAttack.isCrit ? ' (CRITICAL HIT!)' : ''}.`,
    ]);
    this.enemyTakeDamage(heroAttack.damage);

    if (this.enemy().hp > 0) {
      const enemyAttack = this.calculateDamage(currentEnemy.attack);
      this.heroService.updateHp(-enemyAttack.damage);
      this.history.update((hist) => [
        ...hist,
        `Enemy dealt ${enemyAttack.damage} damage${enemyAttack.isCrit ? ' (CRITICAL HIT!)' : ''}.`,
      ]);
    } else {
      this.gameStatus.set(GameStatus.VICTORY);
      this.history.update((hist) => [...hist, `You defeated the enemy!`]);
    }

    if (this.heroService.hero().hp === 0) {
      this.gameStatus.set(GameStatus.GAME_OVER);
      this.history.update((hist) => [...hist, `You have been defeated...`]);
    }
  }
}
