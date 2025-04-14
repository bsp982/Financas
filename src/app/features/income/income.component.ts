import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="income-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Rendas</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <!-- Conteúdo virá aqui -->
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .income-container {
      padding: 20px;
    }

    mat-card {
      margin-bottom: 20px;
    }
  `]
})
export class IncomeComponent {} 