import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../../../core/models/expense.model';

@Component({
  selector: 'app-fixed-expenses-list',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Despesas Fixas</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <div class="table-container">
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
      </mat-card-content>

      <mat-card-actions align="end">
        <button mat-raised-button color="primary" (click)="addExpense()">
          <mat-icon>add</mat-icon>
          Nova Despesa Fixa
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .table-container {
      margin: 16px 0;
      overflow-x: auto;
    }
    
    table {
      width: 100%;
    }

    .mat-mdc-card-actions {
      padding: 16px;
    }
  `]
})
export class FixedExpensesListComponent implements OnInit {
  displayedColumns: string[] = ['description', 'value', 'category', 'dueDate', 'actions'];
  dataSource = new MatTableDataSource<Expense>([]);

  constructor() {}

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