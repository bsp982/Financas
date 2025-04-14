import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceService } from '../../../core/services/finance.service';
import { Income } from '../../../core/models/income.model';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss']
})
export class IncomeFormComponent {
  form: FormGroup;
  isEdit = false;
  @Inject(MAT_DIALOG_DATA) public data!: Income;
  categories: string[] = [
    'Salário',
    'Freelance',
    'Investimentos',
    'Aluguel',
    'Outros'
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IncomeFormComponent>,
    private financeService: FinanceService
  ) {
    this.isEdit = !!this.data;
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      amount: [this.data?.amount || 0, [Validators.required, Validators.min(0)]],
      dueDate: [this.data?.dueDate || 1, [Validators.required, Validators.min(1), Validators.max(31)]],
      category: [this.data?.category || '', Validators.required],
      active: [this.data?.active ?? true]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEdit) {
        this.financeService.updateIncome({
          ...this.data,
          ...this.form.value
        });
      } else {
        this.financeService.addIncome(this.form.value);
      }
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 