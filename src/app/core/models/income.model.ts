export interface Income {
  id: string;
  name: string;
  amount: number;
  dueDate: number; // Dia do recebimento
  category: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
} 