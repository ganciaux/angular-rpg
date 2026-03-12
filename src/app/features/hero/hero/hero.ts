import { Component, signal } from '@angular/core';
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
