import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { createItem, createStarterItems, Item, ItemType } from '../models/item';
import { HeroService } from '../../hero/services/hero';
import { LoggerService } from '../../../shared/services/logger';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  readonly items = signal<Item[]>(createStarterItems());
  private readonly heroservice = inject(HeroService);
  private readonly loggerService = inject(LoggerService);

  readonly statInventory = computed(() => {
    const acc:Record<ItemType, number> = {
      [ItemType.WEAPON]: 0,
      [ItemType.ARMOR]: 0,
      [ItemType.POTION]: 0,
    };
    this.items().forEach(item => {
      acc[item.type] += 1;
    });
    return acc;
  });

  constructor() {
    effect(() => {
      if (this.items().length == 0) {
        this.loggerService.log(`Inventory is empty`);
      }
    });
  }

  initItems() {
    this.items.set(createStarterItems());
  }

  addItem(item: Item) {
    this.items.update(items => [...items, item]);
  }

  removeItem(itemId: string) {
    this.items.update(items => items.filter(item => item.id !== itemId));
  }

  useItem(itemId: string) {
    const item = this.items().find(item => item.id === itemId); 
    if (!item) return;

    let removed = true;

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
        removed=false;
        this.loggerService.warn(`Unknown item type: ${item.type}`);
        break;
    }

    if (removed) {
      this.removeItem(itemId);
    }
  }
}
