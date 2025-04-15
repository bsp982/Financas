import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Expense } from '../../../core/models/expense.model';

@Component({
  selector: 'app-fixed-expenses-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <div class="fixed-expenses-container">
      <div class="header">
        <h2>Despesas Fixas</h2>
        <button mat-raised-button color="primary" (click)="addExpense()">
          <mat-icon>add</mat-icon>
          Nova Despesa
        </button>
      </div>

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Descrição</th>
          <td mat-cell *matCellDef="let expense">{{expense.description}}</td>
        </ng-container>

        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef>Valor</th>
          <td mat-cell *matCellDef="let expense">{{expense.value | currency:'BRL'}}</td>
        </ng-container>

        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Categoria</th>
          <td mat-cell *matCellDef="let expense">{{expense.category}}</td>
        </ng-container>

        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef>Vencimento</th>
          <td mat-cell *matCellDef="let expense">{{expense.dueDate | date:'dd/MM/yyyy'}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Ações</th>
          <td mat-cell *matCellDef="let expense">
            <button mat-icon-button color="primary" (click)="editExpense(expense)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteExpense(expense)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .fixed-expenses-container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }

    .mat-column-actions {
      width: 120px;
      text-align: center;
    }

    .mat-column-value {
      text-align: right;
      padding-right: 24px;
    }

    .mat-column-dueDate {
      text-align: center;
    }
  `]
})
export class FixedExpensesListComponent implements OnInit {
  displayedColumns: string[] = ['description', 'value', 'category', 'dueDate', 'actions'];
  dataSource = new MatTableDataSource<Expense>([]);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // TODO: Carregar despesas fixas
  }

  addExpense(): void {
    // TODO: Implementar adição de despesa
  }

  editExpense(expense: Expense): void {
    // TODO: Implementar edição de despesa
  }

  deleteExpense(expense: Expense): void {
    // TODO: Implementar exclusão de despesa
  }
} 