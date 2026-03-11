import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './features/hero/hero/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}