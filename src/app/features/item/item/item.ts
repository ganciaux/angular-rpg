import { Component, inject } from '@angular/core';
import { ItemTypeLabel } from '../models/item';
import { ItemService } from '../services/item';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class ItemComponent {
  protected readonly itemService = inject(ItemService);
  protected readonly itemTypeLabel = ItemTypeLabel;
}
