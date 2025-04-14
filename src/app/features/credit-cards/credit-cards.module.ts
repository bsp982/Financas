import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CREDIT_CARDS_ROUTES } from './credit-cards.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CREDIT_CARDS_ROUTES)
  ]
})
export class CreditCardsModule { } 