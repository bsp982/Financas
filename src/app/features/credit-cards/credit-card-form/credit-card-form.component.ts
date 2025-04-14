import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
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
          <mat-label>Limite</mat-label>
          <input matInput formControlName="limit" type="number" placeholder="Ex: 5000">
          <mat-error *ngIf="form.get('limit')?.hasError('required')">
            Limite é obrigatório
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
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">
        Salvar
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      limit: ['', Validators.required],
      dueDate: ['', [Validators.required, Validators.min(1), Validators.max(31)]]
    });
  }

  save() {
    if (this.form.valid) {
      // Implementar lógica de salvamento
      console.log(this.form.value);
    }
  }
} 