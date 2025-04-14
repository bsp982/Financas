export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  dueDate: number; // Dia do vencimento
  category: string;
  active: boolean;
  creditCardId?: string; // Opcional, para despesas que são pagas com cartão
  createdAt: Date;
  updatedAt: Date;
} 