import { Routes } from '@angular/router';

export const HERO_ROUTES: Routes = [
  {
    path: 'hero',
    loadComponent: () => import('../hero/hero').then((m) => m.HeroComponent),
  },
];
