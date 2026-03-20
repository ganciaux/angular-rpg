import { Enemy, GameStatus, Hero } from "../../hero/models/hero";
import { Item } from "../../item/models/item";

export interface GameState {
  hero: Hero;
  enemy: Enemy;
  gameStatus: GameStatus;
  enemiesDefeated: number;
  history: string[];
  items: Item[];
}