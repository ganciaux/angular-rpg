import { inject, Injectable, signal } from '@angular/core';
import { createItem, createStarterItems, Item, ItemType } from '../models/item';
import { HeroService } from '../../hero/services/hero';
import { LoggerService } from '../../../shared/services/logger';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items = signal<Item[]>(createStarterItems());
  heroservice = inject(HeroService);
  loggerService = inject(LoggerService);

  initItems() {
    this.items.set(createStarterItems());
  }

  createItem(name: string, type: ItemType, value: number): Item {
    return createItem(name, type, value);
  }

  getItems(): Item[] {
    return this.items();
  }

  addItem(item: Item) {
    this.items.update(items => [...items, item]);
  }

  removeItem(itemId: string) {
    this.items.update(items => items.filter(item => item.id !== itemId));
  }

  useItem(itemId: string) {
    let removed = true
    const item = this.items().find(item => item.id === itemId); 
    if (!item) return;

    switch (item.type) {  
      case ItemType.POTION:
        this.heroservice.updateHp(item.value);
        break;
      case ItemType.WEAPON:
        this.heroservice.updateAttack(item.value);
        break;
      case ItemType.ARMOR:
        this.heroservice.updateHpMax(item.value);
        break;
      default:
        removed
        this.loggerService.warn(`Unknown item type: ${item.type}`);
        break;
    }

    if (removed) {
      this.removeItem(itemId);
    }
  }
}
