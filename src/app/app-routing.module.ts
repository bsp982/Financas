import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'credit-cards', loadChildren: () => import('./features/credit-cards/credit-cards.module').then(m => m.CreditCardsModule) },
  { path: 'fixed-expenses', loadChildren: () => import('./features/fixed-expenses/fixed-expenses.module').then(m => m.FixedExpensesModule) },
  { path: 'income', loadChildren: () => import('./features/income/income.module').then(m => m.IncomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 