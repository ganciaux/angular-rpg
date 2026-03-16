import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { createHero, Hero } from '../models/hero';
import { LoggerService } from '../../../shared/services/logger';
import { getHpStatus } from '../../../shared/utils/hp.utils';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly loggerService = inject(LoggerService);

  readonly hero = signal<Hero>(createHero());

  readonly hpPercent = computed(() => {
    return (this.hero().hp / this.hero().hpMax) * 100;
  });

  readonly heroStatus = computed(() => {
    return getHpStatus(this.hero().hp, this.hero().hpMax);
  });

  constructor() {
    effect(() => this.loggerService.log(`HP changed: ${this.hero().hp}`));
  }

  readonly totalPower = computed(() => {
    const stats = this.hero().stats;
    return Object.values(stats).reduce((sum, val) => sum + val, 0) + this.hero().attack;
  });

  updateName(name: string) {
    this.hero.update((hero) => ({
      ...hero,
      name,
    }));
  }

  updateHp(amount: number) {
    this.hero.update((hero) => ({
      ...hero,
      hp: Math.min(Math.max(hero.hp + amount, 0), this.hero().hpMax),
    }));
  }

  updateHpMax(amount: number) {
    this.hero.update((hero) => ({
      ...hero,
      hpMax: Math.max(hero.hpMax + amount, 10),
    }));
  }

  updateAttack(amount: number) {
    this.hero.update((hero) => ({
      ...hero,
      attack: Math.max(hero.attack + amount, 1),
    }));
  }

  updateLevel(amount: number) {
    this.hero.update((hero) => ({
      ...hero,
      hpMax: Math.max(hero.hpMax + amount * 10, 10),
      attack: Math.max(hero.attack + amount * 2, 1),
      level: Math.max(hero.level + amount, 1),
    }));
  }
}
