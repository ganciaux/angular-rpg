import { Component, computed, effect, signal } from '@angular/core';
import { createHero, Hero, HERO_MAX_HP, HERO_STAT_LIST } from '../models/hero';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  imports: [FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  readonly statList = HERO_STAT_LIST;
  readonly maxHp = HERO_MAX_HP;
  readonly hero = signal<Hero>(createHero({hp: 10}));
  readonly hpPercent = computed(() => {
    return (this.hero().hp / this.maxHp) * 100;
  })
  readonly status = computed(() => {
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

  constructor() {
    effect(() => console.log('HP changed:', this.hero().hp));
  }

  updateHp(amount: number) {
    this.hero.update(hero => ({
      ...hero,
      hp: Math.min(Math.max(hero.hp + amount, 0), this.maxHp)
    }));
  }

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.hero.update(hero => ({
      ...hero,
      name: input.value
    }));
  }

}
