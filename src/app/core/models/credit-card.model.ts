export interface CreditCard {
  id: string;
  name: string;
  dueDate: number; // Dia do vencimento
  closingDate: number; // Dia do fechamento
  statementAmount: number; // Valor da fatura
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
} 