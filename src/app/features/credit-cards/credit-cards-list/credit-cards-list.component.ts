import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CreditCardFormComponent } from '../credit-card-form/credit-card-form.component';
import { CreditCardTransactionsComponent } from '../credit-card-transactions/credit-card-transactions.component';
import { CreditCard } from '../../../core/models/credit-card.model';
import { FinanceService } from '../../../core/services/finance.service';

@Component({
  selector: 'app-credit-cards-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <div class="credit-cards-container">
      <div class="header">
        <h2>Cartões de Crédito</h2>
        <button mat-raised-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon>
          Novo Cartão
        </button>
      </div>

      <table mat-table [dataSource]="creditCards" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nome</th>
          <td mat-cell *matCellDef="let card">{{card.name}}</td>
        </ng-container>

        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef>Vencimento</th>
          <td mat-cell *matCellDef="let card">{{card.dueDate}}</td>
        </ng-container>

        <ng-container matColumnDef="closingDate">
          <th mat-header-cell *matHeaderCellDef>Fechamento</th>
          <td mat-cell *matCellDef="let card">{{card.closingDate}}</td>
        </ng-container>

        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef>Total da Fatura</th>
          <td mat-cell *matCellDef="let card">{{card.statementAmount | currency:'BRL'}}</td>
        </ng-container>

        <ng-container matColumnDef="active">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let card">
            <mat-icon [color]="card.active ? 'primary' : 'warn'">
              {{card.active ? 'check_circle' : 'cancel'}}
            </mat-icon>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Ações</th>
          <td mat-cell *matCellDef="let card">
            <button mat-icon-button color="primary" (click)="openTransactions(card)">
              <mat-icon>receipt_long</mat-icon>
            </button>
            <button mat-icon-button color="primary" (click)="openForm(card)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteCard(card)">
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
    .credit-cards-container {
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
      width: 160px;
      text-align: center;
    }

    .mat-column-active {
      width: 80px;
      text-align: center;
    }

    .mat-column-total {
      text-align: right;
      padding-right: 16px;
    }
  `]
})
export class CreditCardsListComponent {
  displayedColumns: string[] = ['name', 'dueDate', 'closingDate', 'total', 'active', 'actions'];
  creditCards: CreditCard[] = [];

  constructor(
    private dialog: MatDialog,
    private financeService: FinanceService
  ) {
    this.loadCreditCards();
  }

  loadCreditCards(): void {
    this.creditCards = this.financeService.getCreditCards();
  }

  openForm(card?: CreditCard): void {
    const dialogRef = this.dialog.open(CreditCardFormComponent, {
      width: '500px',
      data: card
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (card) {
          this.financeService.updateCreditCard({ ...card, ...result });
        } else {
          this.financeService.addCreditCard(result);
        }
        this.loadCreditCards();
      }
    });
  }

  openTransactions(card: CreditCard): void {
    this.dialog.open(CreditCardTransactionsComponent, {
      width: '800px',
      data: card
    });
  }

  deleteCard(card: CreditCard): void {
    if (confirm('Tem certeza que deseja excluir este cartão?')) {
      this.financeService.deleteCreditCard(card.id);
      this.loadCreditCards();
    }
  }
} 