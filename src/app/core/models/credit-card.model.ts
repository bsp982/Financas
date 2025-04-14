export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  dueDate: number; // Dia do vencimento
  closingDate: number; // Dia do fechamento
  color: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
} 