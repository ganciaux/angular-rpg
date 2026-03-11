import { Component, signal } from '@angular/core';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
 hero = signal<Hero>({
   id: 1,
   name: 'Hero',
   hp: 100,
   level: 1
 });
}