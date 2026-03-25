import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GameStateService } from '../../services/game-state';
import { GameService } from '../../../features/game/services/game';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  gameStateService = inject(GameStateService);
  gameService = inject(GameService);
  
  loadgame() {
    this.gameStateService.load();
    this.gameService.loadGameState();
  }

  savegame() {
    this.gameStateService.save(this.gameService.getGameState());
  }
}
