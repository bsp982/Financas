import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CreditCardFormComponent } from '../credit-card-form/credit-card-form.component';

interface CreditCard {
  id?: string;
  name: string;
  limit: number;
  dueDate: string;
}

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

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nome</th>
          <td mat-cell *matCellDef="let element">{{element.name}}</td>
        </ng-container>

        <ng-container matColumnDef="limit">
          <th mat-header-cell *matHeaderCellDef>Limite</th>
          <td mat-cell *matCellDef="let element">{{element.limit | currency:'BRL'}}</td>
        </ng-container>

        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef>Vencimento</th>
          <td mat-cell *matCellDef="let element">{{element.dueDate}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Ações</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button color="primary" (click)="openForm(element)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteCard(element)">
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
      width: 120px;
      text-align: center;
    }
  `]
})
export class CreditCardsListComponent {
  displayedColumns: string[] = ['name', 'limit', 'dueDate', 'actions'];
  dataSource: CreditCard[] = [
    { id: '1', name: 'Nubank', limit: 5000, dueDate: '10' },
    { id: '2', name: 'Itaú', limit: 3000, dueDate: '15' }
  ];

  constructor(private dialog: MatDialog) {}

  openForm(card?: CreditCard): void {
    const dialogRef = this.dialog.open(CreditCardFormComponent, {
      width: '500px',
      data: card
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualizar lista quando o diálogo for fechado com sucesso
        console.log('Cartão salvo:', result);
      }
    });
  }

  deleteCard(card: CreditCard): void {
    if (confirm('Tem certeza que deseja excluir este cartão?')) {
      // Implementar lógica de exclusão
      console.log('Cartão excluído:', card);
    }
  }
} 