import { Component, Input } from '@angular/core';
import { HpBarComponent } from '../hp-bar/hp-bar';

@Component({
  selector: 'app-character-card',
  imports: [HpBarComponent],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCardComponent {
  @Input() name: string = '';
  @Input() status: string = '';
  @Input() level: number = 1;
  @Input() hp: number = 0;
  @Input() hpMax: number = 0;
  @Input() attack: number = 0;
}
