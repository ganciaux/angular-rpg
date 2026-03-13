import { Component, computed, effect, signal } from '@angular/core';
import { createGoblin, createHero, Enemy, GameStatus, GAME_STATUS_LABEL, Hero, HERO_MAX_HP, HERO_STAT_LIST } from '../models/hero';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  imports: [FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  readonly gameStatusLabel = GAME_STATUS_LABEL;
  readonly statList = HERO_STAT_LIST;
  readonly gameStatusEnum = GameStatus;
  readonly hero = signal<Hero>(createHero({hp: 10}));
  readonly enemy = signal<Enemy>(createGoblin(0));
  readonly enemiesDefeated = signal<number>(0);
  readonly history = signal<string[]>([]);
  readonly hpPercent = computed(() => {
    return (this.hero().hp / this.hero().hpMax) * 100;
  })
  readonly heroStatus = computed(() => {
    return this.getHpStatus(this.hero().hp, this.hero().hpMax);
  });
  readonly enemyStatus = computed(() => {
    return this.getHpStatus(this.enemy().hp, this.enemy().hpMax!);
  });
  readonly enemyHpPercent = computed(() => {
    return (this.enemy().hp / this.enemy().hpMax!) * 100;
  })

  readonly gameStatus = signal<GameStatus>(GameStatus.STOP);

  constructor() {
    effect(() => console.log('HP changed:', this.hero().hp));
  }

  getHpStatus(hp:number, hpMax:number): string {
    if (hp === 0) {
      return '💀 Dead';
    } else if (hp < hpMax * 0.3) {
      return '💥 Critical';
    } else if (hp < hpMax * 0.7) {
      return '🤕 Injured';
    } else {
      return '💪 Healthy';
    }
  }

  updateHp(amount: number) {
    this.hero.update(hero => ({
      ...hero,
      hp: Math.min(Math.max(hero.hp + amount, 0), this.hero().hpMax)
    }));
  }

  updateLevel(amount: number) {
    this.hero.update(hero => ({
      ...hero,
      hpMax: Math.max(hero.hpMax + amount * 10, 10),
      attack: Math.max(hero.attack + amount * 2, 1),
      level: Math.max(hero.level + amount, 1)
    }));
  }

  enemyTakeDamage(amount: number) {
    this.enemy.update(enemy => ({
      ...enemy,
      hp: Math.max(enemy.hp - amount, 0)
    }));
  }

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.hero.update(hero => ({
      ...hero,
      name: input.value
    }));
  }

  startGame() {
    this.enemiesDefeated.set(0);
    this.hero.set(createHero());
    this.enemy.set(createGoblin(this.enemiesDefeated()));
    this.gameStatus.set(GameStatus.PLAYING);
    this.history.set([]);
  }

  stopGame() {
    this.gameStatus.set(GameStatus.STOP);
  }

  restartGame() {
    this.startGame();
  }

  nextLevel() {
    let currentHero = this.hero();
    this.enemiesDefeated.update(count => count + 1);
    this.enemy.set(createGoblin(this.enemiesDefeated()));
    this.updateHp((this.hero().hpMax - currentHero.hp) / 2);
    this.updateLevel(1);
    this.gameStatus.set(GameStatus.PLAYING);
    this.history.set([]);
  }

  attack() {
    const currentHero = this.hero();
    const currentEnemy = this.enemy();
    let damage = Math.floor(Math.random() * (currentHero.attack + 1));
    let isCrit = Math.random() < 0.1;
    let finalDamage = isCrit ? damage * 2 : damage;

    this.history.update(hist => [...hist, `You dealt ${finalDamage} damage${isCrit ? ' (CRITICAL HIT!)' : ''}.`]);  
    this.enemyTakeDamage(finalDamage);

    if (this.enemy().hp>0){
      damage = Math.floor(Math.random() * (currentEnemy.attack + 1));
      isCrit = Math.random() < 0.1;
      finalDamage = isCrit ? damage * 2 : damage;
      this.updateHp(-finalDamage);
      this.history.update(hist => [...hist, `Enemy dealt ${finalDamage} damage${isCrit ? ' (CRITICAL HIT!)' : ''}.`]);  
    } 
    else{
      this.gameStatus.set(GameStatus.VICTORY);
      this.history.update(hist => [...hist, `You defeated the enemy!`]);
    }

    if (this.hero().hp === 0) {
      this.gameStatus.set(GameStatus.GAME_OVER);
      this.history.update(hist => [...hist, `You have been defeated...`]);
    }
  }
} 
