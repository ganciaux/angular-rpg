import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found/not-found-component';
import { ItemComponent } from './features/item/item/item';
import { HeroComponent } from './features/hero/hero/hero';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'hero',
        pathMatch: 'full'
    },
    {
        path: 'hero',
        component: HeroComponent
    },
    {
        path: 'inventory',
        component: ItemComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
