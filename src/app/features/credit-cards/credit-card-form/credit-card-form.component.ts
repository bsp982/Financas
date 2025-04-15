import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from '../../../core/models/credit-card.model';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Novo' }} Cartão de Crédito</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="form-container">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" placeholder="Ex: Nubank">
          <mat-error *ngIf="form.get('name')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Valor da Fatura</mat-label>
          <input matInput formControlName="statementAmount" type="number" placeholder="Ex: 1000.00">
          <mat-error *ngIf="form.get('statementAmount')?.hasError('required')">
            Valor da fatura é obrigatório
          </mat-error>
          <mat-error *ngIf="form.get('statementAmount')?.hasError('min')">
            Valor deve ser maior que zero
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Dia do Vencimento</mat-label>
          <input matInput formControlName="dueDate" type="number" placeholder="Ex: 10">
          <mat-error *ngIf="form.get('dueDate')?.hasError('required')">
            Dia do vencimento é obrigatório
          </mat-error>
          <mat-error *ngIf="form.get('dueDate')?.hasError('min') || form.get('dueDate')?.hasError('max')">
            Dia deve estar entre 1 e 31
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Dia do Fechamento</mat-label>
          <input matInput formControlName="closingDate" type="number" placeholder="Ex: 5">
          <mat-error *ngIf="form.get('closingDate')?.hasError('required')">
            Dia do fechamento é obrigatório
          </mat-error>
          <mat-error *ngIf="form.get('closingDate')?.hasError('min') || form.get('closingDate')?.hasError('max')">
            Dia deve estar entre 1 e 31
          </mat-error>
        </mat-form-field>

        <mat-checkbox formControlName="active">Ativo</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="onSubmit()">
        {{isEdit ? 'Salvar' : 'Criar'}}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px 0;
    }

    .full-width {
      width: 100%;
    }
  `]
})
export class CreditCardFormComponent {
  form: FormGroup;
  isEdit = false;
  @Inject(MAT_DIALOG_DATA) public data!: CreditCard;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreditCardFormComponent>
  ) {
    this.isEdit = !!this.data;
    
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      statementAmount: [this.data?.statementAmount || 0, [Validators.required, Validators.min(0.01)]],
      dueDate: [this.data?.dueDate || 1, [Validators.required, Validators.min(1), Validators.max(31)]],
      closingDate: [this.data?.closingDate || 1, [Validators.required, Validators.min(1), Validators.max(31)]],
      active: [this.data?.active ?? true]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 