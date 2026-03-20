import { Component, inject, Input } from '@angular/core';
import { HeroService } from '../../features/hero/services/hero';
import { HpBar } from '../hp-bar/hp-bar';

@Component({
  selector: 'app-character-card',
  imports: [HpBar],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  @Input() name: string = '';
  @Input() status: string = '';
  @Input() level: number = 1;
  @Input() hp: number = 0;
  @Input() hpMax: number = 0;
  @Input() attack: number = 0;

  heroService = inject(HeroService);
}
