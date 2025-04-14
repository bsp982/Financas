import { Injectable } from '@angular/core';
import { CreditCard } from '../models/credit-card.model';
import { FixedExpense } from '../models/fixed-expense.model';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private readonly CREDIT_CARDS_KEY = 'credit_cards';
  private readonly FIXED_EXPENSES_KEY = 'fixed_expenses';
  private readonly INCOMES_KEY = 'incomes';

  constructor() {
    // Inicializa os dados no localStorage se não existirem
    if (!localStorage.getItem(this.CREDIT_CARDS_KEY)) {
      localStorage.setItem(this.CREDIT_CARDS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.FIXED_EXPENSES_KEY)) {
      localStorage.setItem(this.FIXED_EXPENSES_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.INCOMES_KEY)) {
      localStorage.setItem(this.INCOMES_KEY, JSON.stringify([]));
    }
  }

  // Métodos para Cartões de Crédito
  getCreditCards(): CreditCard[] {
    return JSON.parse(localStorage.getItem(this.CREDIT_CARDS_KEY) || '[]');
  }

  addCreditCard(card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>): void {
    const cards = this.getCreditCards();
    const newCard: CreditCard = {
      ...card,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    cards.push(newCard);
    localStorage.setItem(this.CREDIT_CARDS_KEY, JSON.stringify(cards));
  }

  updateCreditCard(card: CreditCard): void {
    const cards = this.getCreditCards();
    const index = cards.findIndex(c => c.id === card.id);
    if (index !== -1) {
      cards[index] = { ...card, updatedAt: new Date() };
      localStorage.setItem(this.CREDIT_CARDS_KEY, JSON.stringify(cards));
    }
  }

  deleteCreditCard(id: string): void {
    const cards = this.getCreditCards().filter(c => c.id !== id);
    localStorage.setItem(this.CREDIT_CARDS_KEY, JSON.stringify(cards));
  }

  // Métodos para Despesas Fixas
  getFixedExpenses(): FixedExpense[] {
    return JSON.parse(localStorage.getItem(this.FIXED_EXPENSES_KEY) || '[]');
  }

  addFixedExpense(expense: Omit<FixedExpense, 'id' | 'createdAt' | 'updatedAt'>): void {
    const expenses = this.getFixedExpenses();
    const newExpense: FixedExpense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    expenses.push(newExpense);
    localStorage.setItem(this.FIXED_EXPENSES_KEY, JSON.stringify(expenses));
  }

  updateFixedExpense(expense: FixedExpense): void {
    const expenses = this.getFixedExpenses();
    const index = expenses.findIndex(e => e.id === expense.id);
    if (index !== -1) {
      expenses[index] = { ...expense, updatedAt: new Date() };
      localStorage.setItem(this.FIXED_EXPENSES_KEY, JSON.stringify(expenses));
    }
  }

  deleteFixedExpense(id: string): void {
    const expenses = this.getFixedExpenses().filter(e => e.id !== id);
    localStorage.setItem(this.FIXED_EXPENSES_KEY, JSON.stringify(expenses));
  }

  // Métodos para Rendas
  getIncomes(): Income[] {
    return JSON.parse(localStorage.getItem(this.INCOMES_KEY) || '[]');
  }

  addIncome(income: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>): void {
    const incomes = this.getIncomes();
    const newIncome: Income = {
      ...income,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    incomes.push(newIncome);
    localStorage.setItem(this.INCOMES_KEY, JSON.stringify(incomes));
  }

  updateIncome(income: Income): void {
    const incomes = this.getIncomes();
    const index = incomes.findIndex(i => i.id === income.id);
    if (index !== -1) {
      incomes[index] = { ...income, updatedAt: new Date() };
      localStorage.setItem(this.INCOMES_KEY, JSON.stringify(incomes));
    }
  }

  deleteIncome(id: string): void {
    const incomes = this.getIncomes().filter(i => i.id !== id);
    localStorage.setItem(this.INCOMES_KEY, JSON.stringify(incomes));
  }
} 