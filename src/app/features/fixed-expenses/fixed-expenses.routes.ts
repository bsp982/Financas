import { Routes } from '@angular/router';

export const FIXED_EXPENSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./fixed-expenses-list/fixed-expenses-list.component').then(m => m.FixedExpensesListComponent)
  }
]; 