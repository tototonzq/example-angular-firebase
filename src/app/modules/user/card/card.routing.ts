import { Route } from '@angular/router';
import { CardComponent } from './card.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardDetailComponent } from './card-detail/card-detail.component';

export const cardRoutes: Route[] = [
  {
    path: '',
    component: CardComponent,
    children: [
      { path: '', component: CardListComponent },
      { path: ':id', component: CardDetailComponent },
    ],
  },
];
