export interface CreditCardStatement {
  id: string;
  creditCardId: string;
  cardName: string;
  month: number; // 1-12
  year: number;
  closingDate: Date; // Data de fechamento da fatura
  dueDate: Date; // Data de vencimento
  totalAmount: number;
  paid: boolean;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditCardStatementSummary {
  id: string;
  cardName: string;
  month: number;
  year: number;
  totalAmount: number;
  paid: boolean;
  dueDate: Date;
} 