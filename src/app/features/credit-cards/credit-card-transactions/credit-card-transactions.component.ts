import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CreditCard } from '../../../core/models/credit-card.model';
import { CreditCardTransaction } from '../../../core/models/credit-card-transaction.model';
import { FinanceService } from '../../../core/services/finance.service';
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';
import { CreditCardTransactionService } from '../../../core/services/credit-card-transaction.service';
@Component({
  selector: 'app-credit-card-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>Transações do Cartão {{data.name}}</h2>
    <mat-dialog-content>
      <div class="summary">
        <div class="summary-item">
          <span class="label">Total da Fatura:</span>
          <span class="value">{{getTotal() | currency:'BRL'}}</span>
        </div>
      </div>

      <table mat-table [dataSource]="transactions" class="mat-elevation-z8">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Data</th>
          <td mat-cell *matCellDef="let transaction">{{transaction.date | date:'dd/MM/yyyy'}}</td>
        </ng-container>

        <ng-container matColumnDef="establishment">
          <th mat-header-cell *matHeaderCellDef>Estabelecimento</th>
          <td mat-cell *matCellDef="let transaction">{{transaction.establishment}}</td>
        </ng-container>

        <ng-container matColumnDef="holder">
          <th mat-header-cell *matHeaderCellDef>Portador</th>
          <td mat-cell *matCellDef="let transaction">{{transaction.holder}}</td>
        </ng-container>

        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Valor</th>
          <td mat-cell *matCellDef="let transaction">{{transaction.amount | currency:'BRL'}}</td>
        </ng-container>

        <ng-container matColumnDef="installment">
          <th mat-header-cell *matHeaderCellDef>Parcela</th>
          <td mat-cell *matCellDef="let transaction">
            {{transaction.installment ? transaction.installment.current + ' de ' + transaction.installment.total : '-'}}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <div class="import-section">
        <input type="file" 
               #fileInput 
               (change)="onFileSelected($event)" 
               accept=".csv,.xlsx,.xls" 
               style="display: none">
        <button mat-raised-button 
                color="primary" 
                (click)="fileInput.click()"
                type="button">
          <mat-icon>upload</mat-icon>
          Importar Fatura
        </button>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Fechar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .summary {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .summary-item {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.54);
    }

    .value {
      font-size: 1.25rem;
      font-weight: 500;
    }

    table {
      width: 100%;
      margin-bottom: 24px;
    }

    .mat-column-amount {
      text-align: right;
      padding-right: 16px;
    }

    .import-section {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }
  `]
})
export class CreditCardTransactionsComponent {
  displayedColumns: string[] = ['date', 'establishment', 'holder', 'amount', 'installment'];
  transactions: CreditCardTransaction[] = [];
  isLoading = false;

  @Inject(MAT_DIALOG_DATA) public data!: CreditCard;

  constructor(
    private dialogRef: MatDialogRef<CreditCardTransactionsComponent>,
    private financeService: FinanceService,
    private snackBar: MatSnackBar,
    private transactionService: CreditCardTransactionService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.financeService.getCreditCardTransactions()
      .pipe(
        map(transactions => transactions
          .filter(t => t.cardName === this.data.name)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        )
      )
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar transações:', error);
          this.snackBar.open('Erro ao carregar transações', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
  }

  getTotal(): number {
    return this.transactions.reduce((total, t) => total + t.amount, 0);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          
          const transactions = data.map((row: any) => ({
            id: '', // Será gerado pelo serviço
            date: this.parseExcelDate(row.Data),
            description: row.Descrição,
            amount: this.parseAmount(row.Valor),
            installment: this.parseInstallment(row.Parcela),
            category: row.Categoria || '',
            cardName: row.Cartão || '',
            creditCardId: this.data.id,
            establishment: row.Estabelecimento || '',
            holder: row.Portador || '',
            createdAt: new Date(),
            updatedAt: new Date()
          })) as CreditCardTransaction[];

          Promise.all(transactions.map(t => this.transactionService.addTransaction(t)))
            .then(() => {
              this.snackBar.open('Transações importadas com sucesso!', 'Fechar', { duration: 3000 });
              this.loadTransactions();
            })
            .catch(error => {
              console.error('Erro ao importar transações:', error);
              this.snackBar.open('Erro ao importar transações', 'Fechar', { duration: 3000 });
            });
        } catch (error) {
          console.error('Erro ao processar arquivo:', error);
          this.snackBar.open('Erro ao processar arquivo Excel', 'Fechar', { duration: 3000 });
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  private parseExcelDate(excelDate: any): Date {
    if (!excelDate) return new Date();
    
    if (typeof excelDate === 'string') {
      return new Date(excelDate);
    }
    
    // Excel dates are number of days since 1900-01-01
    const utc_days = Math.floor(excelDate - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
  }

  private parseAmount(amount: any): number {
    if (typeof amount === 'number') return amount;
    if (typeof amount === 'string') {
      return parseFloat(amount.replace('R$', '').replace('.', '').replace(',', '.').trim());
    }
    return 0;
  }

  private parseInstallment(installment: any): { current: number; total: number } | undefined {
    if (!installment) return undefined;
    if (typeof installment === 'string') {
      const match = installment.match(/(\d+)\/(\d+)/);
      if (match) {
        return {
          current: parseInt(match[1]),
          total: parseInt(match[2])
        };
      }
    }
    return undefined;
  }

  close(): void {
    this.dialogRef.close();
  }
} 