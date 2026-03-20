import { Component, inject } from '@angular/core';
import { GAME_STATUS_LABEL, GameStatus, HERO_STAT_LIST } from '../models/hero';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../services/hero';
import { GameService } from '../../game/services/game';
import { ItemService } from '../../item/services/item';
import { ItemTypeLabel } from '../../item/models/item';
import { JsonPipe } from '@angular/common';
import { ItemComponent } from "../../item/item/item";
import { CharacterCard } from "../../../shared/character-card/character-card";

@Component({
  selector: 'app-hero',
  imports: [FormsModule, JsonPipe, ItemComponent, CharacterCard],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  protected readonly heroService = inject(HeroService);
  protected readonly gameService = inject(GameService);
  protected readonly itemService = inject(ItemService);

  readonly statList = HERO_STAT_LIST;
  readonly gameStatus = GameStatus;
  readonly gameStatusLabel = GAME_STATUS_LABEL;
  readonly itemTypeLabel = ItemTypeLabel;

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.heroService.updateName(input.value);
  }

}