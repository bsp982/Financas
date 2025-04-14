import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceService } from '../../../core/services/finance.service';
import { FixedExpense } from '../../../core/models/fixed-expense.model';
import { CreditCard } from '../../../core/models/credit-card.model';

@Component({
  selector: 'app-fixed-expense-form',
  templateUrl: './fixed-expense-form.component.html',
  styleUrls: ['./fixed-expense-form.component.scss']
})
export class FixedExpenseFormComponent {
  form: FormGroup;
  isEdit = false;
  creditCards: CreditCard[] = [];
  @Inject(MAT_DIALOG_DATA) public data: FixedExpense;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FixedExpenseFormComponent>,
    private financeService: FinanceService
  ) {
    this.isEdit = !!this.data;
    this.creditCards = this.financeService.getCreditCards();
    
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      amount: [this.data?.amount || 0, [Validators.required, Validators.min(0)]],
      dueDate: [this.data?.dueDate || 1, [Validators.required, Validators.min(1), Validators.max(31)]],
      category: [this.data?.category || '', Validators.required],
      creditCardId: [this.data?.creditCardId || ''],
      active: [this.data?.active ?? true]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEdit) {
        this.financeService.updateFixedExpense({
          ...this.data,
          ...this.form.value
        });
      } else {
        this.financeService.addFixedExpense(this.form.value);
      }
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 