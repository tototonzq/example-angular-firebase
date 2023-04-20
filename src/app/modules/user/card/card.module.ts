import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cardRoutes } from './card.routing';
import { CardComponent } from './card.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardDetailComponent } from './card-detail/card-detail.component';

const components = [CardComponent, CardListComponent, CardDetailComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(cardRoutes)],
})
export class CardModule {}
