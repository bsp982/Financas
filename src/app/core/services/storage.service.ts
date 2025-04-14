import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly EXPENSES_KEY = 'financas_expenses';
  private readonly INCOMES_KEY = 'financas_incomes';

  constructor() {}

  // Métodos para despesas
  getExpenses(): Expense[] {
    const expenses = localStorage.getItem(this.EXPENSES_KEY);
    return expenses ? JSON.parse(expenses) : [];
  }

  saveExpenses(expenses: Expense[]): void {
    localStorage.setItem(this.EXPENSES_KEY, JSON.stringify(expenses));
  }

  addExpense(expense: Expense): void {
    const expenses = this.getExpenses();
    expenses.push(expense);
    this.saveExpenses(expenses);
  }

  updateExpense(expense: Expense): void {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(e => e.id === expense.id);
    if (index !== -1) {
      expenses[index] = expense;
      this.saveExpenses(expenses);
    }
  }

  deleteExpense(id: string): void {
    const expenses = this.getExpenses().filter(e => e.id !== id);
    this.saveExpenses(expenses);
  }

  // Métodos para receitas
  getIncomes(): Income[] {
    const incomes = localStorage.getItem(this.INCOMES_KEY);
    return incomes ? JSON.parse(incomes) : [];
  }

  saveIncomes(incomes: Income[]): void {
    localStorage.setItem(this.INCOMES_KEY, JSON.stringify(incomes));
  }

  addIncome(income: Income): void {
    const incomes = this.getIncomes();
    incomes.push(income);
    this.saveIncomes(incomes);
  }

  updateIncome(income: Income): void {
    const incomes = this.getIncomes();
    const index = incomes.findIndex(i => i.id === income.id);
    if (index !== -1) {
      incomes[index] = income;
      this.saveIncomes(incomes);
    }
  }

  deleteIncome(id: string): void {
    const incomes = this.getIncomes().filter(i => i.id !== id);
    this.saveIncomes(incomes);
  }
} 