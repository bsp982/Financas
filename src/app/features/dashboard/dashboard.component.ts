import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatIconModule, CommonModule],
  template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Resumo Financeiro</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-grid-list cols="3" rowHeight="200px">
            <mat-grid-tile>
              <div class="summary-item positive">
                <span class="material-icons">trending_up</span>
                <h3>Receitas Totais</h3>
                <p>R$ 0,00</p>
              </div>
            </mat-grid-tile>
            <mat-grid-tile>
              <div class="summary-item negative">
                <span class="material-icons">trending_down</span>
                <h3>Despesas Totais</h3>
                <p>R$ 0,00</p>
              </div>
            </mat-grid-tile>
            <mat-grid-tile>
              <div class="summary-item neutral">
                <span class="material-icons">account_balance</span>
                <h3>Saldo</h3>
                <p>R$ 0,00</p>
              </div>
            </mat-grid-tile>
          </mat-grid-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }

    mat-card {
      margin-bottom: 20px;
    }

    .summary-item {
      text-align: center;
      padding: 20px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.03);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .summary-item .material-icons {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .summary-item h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }

    .summary-item p {
      margin: 8px 0 0;
      font-size: 24px;
      font-weight: 500;
    }

    .positive {
      color: #4caf50;
    }

    .negative {
      color: #f44336;
    }

    .neutral {
      color: #2196f3;
    }
  `]
})
export class DashboardComponent {}