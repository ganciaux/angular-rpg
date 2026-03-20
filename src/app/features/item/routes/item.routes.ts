import { Routes } from '@angular/router';

export const ITEM_ROUTES: Routes = [
  {
    path: 'inventory',
    loadComponent: () => import('../item/item').then((m) => m.ItemComponent),
  },
];
