import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../core/services/finance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalFaturas: number = 0;
  totalDespesas: number = 0;

  constructor(private financeService: FinanceService) {
    this.calcularTotais();
  }

  calcularTotais(): void {
    const creditCards = this.financeService.getCreditCards();
    const fixedExpenses = this.financeService.getFixedExpenses();
    this.totalFaturas = creditCards.reduce((total, card) => total + (card.statementAmount || 0), 0);
    this.totalDespesas = this.totalFaturas + fixedExpenses.reduce((total, exp) => total + (exp.amount || 0), 0);
  }
}