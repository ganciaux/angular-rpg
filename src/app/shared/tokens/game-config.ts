import { InjectionToken } from '@angular/core';

export interface GameConfig {
  critChance: number;
  baseDamageMultiplier: number;
  healMultiplier: number;
}

export const GAME_CONFIG_DEFAULT: GameConfig = {
  critChance: 0.1,
  baseDamageMultiplier: 2,
  healMultiplier: 0.5,
};

export const GAME_CONFIG = new InjectionToken<GameConfig>('GameConfig', {
  providedIn: 'root',
  factory: () => GAME_CONFIG_DEFAULT
});