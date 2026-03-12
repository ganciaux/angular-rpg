import { Component, signal } from '@angular/core';
import { createHero, Hero, HERO_STAT_LIST } from '../models/hero';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  readonly statList = HERO_STAT_LIST;
  readonly hero = signal<Hero>(createHero());
}
