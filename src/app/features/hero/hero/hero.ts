import { Component, signal } from '@angular/core';
import { createHero, Hero } from '../models/hero';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  readonly hero = signal<Hero>(createHero());
}
