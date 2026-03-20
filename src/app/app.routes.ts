import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found/not-found-component';
import { HERO_ROUTES } from './features/hero/routes/hero.routes';
import { ITEM_ROUTES } from './features/item/routes/item.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'hero',
        pathMatch: 'full'
    },
    ...HERO_ROUTES,
    ...ITEM_ROUTES,
    {
        path: '**',
        component: NotFoundComponent
    }
];
