import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, orderBy, getDocs, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { CreditCardTransaction } from '../models/credit-card-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardTransactionService {
  private readonly collectionName = 'credit-card-transactions';

  constructor(private firestore: Firestore) {}

  getTransactions(): Observable<CreditCardTransaction[]> {
    const transactionsRef = collection(this.firestore, this.collectionName);
    const q = query(transactionsRef, orderBy('date', 'desc'));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as CreditCardTransaction))
    );
  }

  async addTransaction(transaction: CreditCardTransaction): Promise<DocumentReference<DocumentData>> {
    const transactionsRef = collection(this.firestore, this.collectionName);
    return addDoc(transactionsRef, transaction);
  }

  async updateTransaction(id: string, transaction: Partial<CreditCardTransaction>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return updateDoc(docRef, transaction);
  }

  async deleteTransaction(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return deleteDoc(docRef);
  }

  getTransactionsByCard(cardName: string): Observable<CreditCardTransaction[]> {
    const transactionsRef = collection(this.firestore, this.collectionName);
    const q = query(transactionsRef, where('cardName', '==', cardName), orderBy('date', 'desc'));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as CreditCardTransaction))
    );
  }

  getTransactionsByMonth(month: number, year: number): Observable<CreditCardTransaction[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const transactionsRef = collection(this.firestore, this.collectionName);
    const q = query(
      transactionsRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    );
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as CreditCardTransaction))
    );
  }

  // Buscar transações por intervalo de data
  getTransactionsByDateRange(cardName: string, startDate: Date, endDate: Date): Observable<CreditCardTransaction[]> {
    const transactionsRef = collection(this.firestore, this.collectionName);
    const q = query(
      transactionsRef,
      where('cardName', '==', cardName),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    );
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as CreditCardTransaction))
    );
  }
} 