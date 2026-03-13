import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { createHero, Hero } from '../models/hero';
import { LoggerService } from '../../../shared/services/logger';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly loggerService = inject(LoggerService)

  readonly hero = signal<Hero>(createHero({hp: 10}));
  
  readonly hpPercent = computed(() => {
    return (this.hero().hp / this.hero().hpMax) * 100;
  })

  readonly heroStatus = computed(() => {
    return this.getHpStatus(this.hero().hp, this.hero().hpMax);
  });

  constructor() {
    effect(() => this.loggerService.log(`HP changed: ${this.hero().hp}`));
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

  updateName(name: string) {
    this.hero.update(hero => ({
      ...hero,
      name
    }));
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
}
