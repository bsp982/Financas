import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class FixedExpensesService {
  private expenses: Expense[] = [];

  constructor() {}

  getExpenses(): Observable<Expense[]> {
    return of(this.expenses);
  }

  addExpense(expense: Expense): Observable<Expense> {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.expenses.push(newExpense);
    return of(newExpense);
  }

  updateExpense(expense: Expense): Observable<Expense | undefined> {
    const index = this.expenses.findIndex(e => e.id === expense.id);
    if (index !== -1) {
      this.expenses[index] = {
        ...expense,
        updatedAt: new Date()
      };
      return of(this.expenses[index]);
    }
    return of(undefined);
  }

  deleteExpense(id: string): Observable<boolean> {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      this.expenses.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
} 