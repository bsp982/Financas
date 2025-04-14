import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinanceService } from '../../../core/services/finance.service';
import { Income } from '../../../core/models/income.model';
import { IncomeFormComponent } from '../income-form/income-form.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent implements OnInit {
  incomes: Income[] = [];
  displayedColumns: string[] = ['name', 'amount', 'dueDate', 'category', 'active', 'actions'];

  constructor(
    private dialog: MatDialog,
    private financeService: FinanceService
  ) {}

  ngOnInit(): void {
    this.loadIncomes();
  }

  loadIncomes(): void {
    this.incomes = this.financeService.getIncomes();
  }

  openForm(income?: Income): void {
    const dialogRef = this.dialog.open(IncomeFormComponent, {
      width: '500px',
      data: income
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIncomes();
      }
    });
  }

  deleteIncome(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta renda?')) {
      this.financeService.deleteIncome(id);
      this.loadIncomes();
    }
  }
} 