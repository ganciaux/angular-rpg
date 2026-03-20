import { Injectable, signal } from '@angular/core';
import { GameState } from '../../features/game/models/game';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  state=signal<GameState>({} as GameState);

  save(state: GameState) {
    this.setState(state);  
    localStorage.setItem('gameState', JSON.stringify(state));
  }

  load() {
    const state = localStorage.getItem('gameState');
    console.log('Loaded game state:', state);
    this.setState(state ? JSON.parse(state) : null);
  }

  setState(newState: GameState) {
    this.state.set(newState);
  }
}
