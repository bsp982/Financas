import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [mode]="'side'"
          [opened]="true">
        <mat-toolbar class="sidenav-header">
          <mat-icon class="header-icon">account_balance</mat-icon>
          <span>Menu</span>
        </mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/credit-cards" routerLinkActive="active">
            <mat-icon matListItemIcon>credit_card</mat-icon>
            <span matListItemTitle>Cartões de Crédito</span>
          </a>
          <a mat-list-item routerLink="/fixed-expenses" routerLinkActive="active">
            <mat-icon matListItemIcon>payments</mat-icon>
            <span matListItemTitle>Despesas Fixas</span>
          </a>
          <a mat-list-item routerLink="/income" routerLinkActive="active">
            <mat-icon matListItemIcon>trending_up</mat-icon>
            <span matListItemTitle>Rendas</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Controle Financeiro</span>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
      background-color: #fafafa;
    }

    .sidenav-header {
      display: flex;
      align-items: center;
      padding: 0 16px;
      background-color: #3f51b5;
      color: white;
      height: 64px;
    }

    .header-icon {
      margin-right: 8px;
    }

    .content {
      padding: 20px;
    }

    mat-nav-list {
      padding-top: 8px;
    }

    mat-nav-list a {
      height: 48px;
      margin: 8px 8px;
      border-radius: 4px;
    }

    .active {
      background-color: rgba(63, 81, 181, 0.1) !important;
      color: #3f51b5;
    }

    .active mat-icon {
      color: #3f51b5;
    }

    mat-icon {
      margin-right: 12px;
    }

    mat-list-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class AppComponent {
  title = 'financas';
}
