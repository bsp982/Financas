import { Routes } from '@angular/router';

export const CREDIT_CARDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./credit-cards-list/credit-cards-list.component').then(m => m.CreditCardsListComponent)
  }
]; 