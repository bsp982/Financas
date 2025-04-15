import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'credit-cards',
    loadChildren: () => import('./features/credit-cards/credit-cards.module').then(m => m.CreditCardsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'fixed-expenses',
    loadChildren: () => import('./features/fixed-expenses/fixed-expenses.module').then(m => m.FixedExpensesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'income',
    loadChildren: () => import('./features/income/income.module').then(m => m.IncomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 