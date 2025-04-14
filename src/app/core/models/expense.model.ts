export interface Expense {
  id?: string;
  description: string;
  value: number;
  category: string;
  dueDate: Date;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 