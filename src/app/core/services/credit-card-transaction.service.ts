import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCardTransaction } from '../models/credit-card-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardTransactionService {
  private readonly collectionName = 'credit-card-transactions';

  constructor(private firestore: AngularFirestore) {}

  getTransactions(): Observable<CreditCardTransaction[]> {
    return this.firestore
      .collection<CreditCardTransaction>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  async addTransaction(transaction: CreditCardTransaction): Promise<DocumentReference<CreditCardTransaction>> {
    return this.firestore.collection<CreditCardTransaction>(this.collectionName).add(transaction);
  }

  async updateTransaction(id: string, transaction: Partial<CreditCardTransaction>): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(transaction);
  }

  async deleteTransaction(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }

  getTransactionsByCard(cardName: string): Observable<CreditCardTransaction[]> {
    return this.firestore
      .collection<CreditCardTransaction>(this.collectionName, ref => 
        ref.where('cardName', '==', cardName))
      .valueChanges({ idField: 'id' });
  }

  getTransactionsByMonth(year: number, month: number): Observable<CreditCardTransaction[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.firestore
      .collection<CreditCardTransaction>(this.collectionName, ref => 
        ref.where('date', '>=', startDate)
           .where('date', '<=', endDate))
      .valueChanges({ idField: 'id' });
  }
} 