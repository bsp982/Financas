export interface CreditCardTransaction {
  id?: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  cardName: string;
  creditCardId: string;
  establishment: string;
  holder: string;
  installment?: {
    current: number;
    total: number;
  };
  totalInstallments?: number;
  createdAt?: Date;
  updatedAt?: Date;
} 