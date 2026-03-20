import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hp-bar',
  imports: [],
  templateUrl: './hp-bar.html',
  styleUrl: './hp-bar.css',
})
export class HpBarComponent {
  @Input() hp: number = 0;
  @Input() hpMax: number = 0;

  hpPercent(): number {
    if (this.hpMax === 0) return 0;
    return (this.hp / this.hpMax) * 100;
  }
}
