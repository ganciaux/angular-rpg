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
  readonly maxHp = HERO_MAX_HP;
  readonly gameStatusEnum = GameStatus;
  readonly hero = signal<Hero>(createHero({hp: 10}));
  readonly enemy = signal<Enemy>(createGoblin());
  readonly enemiesDefeated = signal<number>(0);
  readonly hpPercent = computed(() => {
    return (this.hero().hp / this.maxHp) * 100;
  })
  readonly heroStatus = computed(() => {
    if (this.hero().hp === 0) {
      return '💀 Dead';
    } else if (this.hero().hp < this.maxHp * 0.3) {
      return '💥 Critical';
    } else if (this.hero().hp < this.maxHp * 0.7) {
      return '🤕 Injured';
    } else {
      return '💪 Healthy';
    }
  });
  readonly enemyStatus = computed(() => {return '';});
  readonly enemyHpPercent = computed(() => {
    return (this.enemy().hp / this.enemy().hpMax!) * 100;
  })

  gameStatus = signal<GameStatus>(GameStatus.STOP);

  constructor() {
    effect(() => console.log('HP changed:', this.hero().hp));
  }

  updateHp(amount: number) {
    this.hero.update(hero => ({
      ...hero,
      hp: Math.min(Math.max(hero.hp + amount, 0), this.maxHp)
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
    this.enemy.set(createGoblin());
    this.gameStatus.set(GameStatus.PLAYING);
  }

  stopGame() {
    this.gameStatus.set(GameStatus.STOP);
  }

  restartGame() {
    this.enemiesDefeated.set(0);
    this.hero.set(createHero());
    this.enemy.set(createGoblin());
    this.gameStatus.set(GameStatus.PLAYING);
  }

  nextLevel() {
    let currentHero = this.hero();
    this.enemiesDefeated.update(count => count + 1);
    this.enemy.set(createGoblin());
    this.updateHp(currentHero.hp + (this.maxHp - currentHero.hp) / 2);
  }

  attack() {
    const currentHero = this.hero();
    const currentEnemy = this.enemy();
    let damage = Math.floor(Math.random() * (currentHero.attack + 1));
    let isCrit = Math.random() < 0.1;
    let finalDamage = isCrit ? damage * 2 : damage;

    this.enemyTakeDamage(finalDamage);

    if (this.enemy().hp>0){
      damage = Math.floor(Math.random() * (currentEnemy.attack + 1));
      isCrit = Math.random() < 0.1;
      finalDamage = isCrit ? damage * 2 : damage;
      this.updateHp(-finalDamage);
    } 
    else{
      this.gameStatus.set(GameStatus.VICTORY);
    }
  }
} 
