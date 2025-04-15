import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc, orderBy } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCardStatement, CreditCardStatementSummary } from '../models/credit-card-statement.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardStatementService {
  private readonly collectionName = 'credit-card-statements';

  constructor(
    private firestore: Firestore
  ) {}

  // Buscar todos os fechamentos de um cartão
  getStatementsByCard(cardName: string): Observable<CreditCardStatement[]> {
    const statementsRef = collection(this.firestore, this.collectionName);
    const q = query(
      statementsRef,
      where('cardName', '==', cardName),
      orderBy('year', 'desc'),
      orderBy('month', 'desc')
    );

    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as CreditCardStatement))
    );
  }

  // Buscar fechamento específico por mês/ano
  getStatement(cardName: string, month: number, year: number): Observable<CreditCardStatement | null> {
    const statementsRef = collection(this.firestore, this.collectionName);
    const q = query(
      statementsRef,
      where('cardName', '==', cardName),
      where('month', '==', month),
      where('year', '==', year)
    );

    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as CreditCardStatement;
      })
    );
  }

  // Criar novo fechamento mensal
  async createStatement(statement: Omit<CreditCardStatement, 'id'>): Promise<string> {
    const statementsRef = collection(this.firestore, this.collectionName);
    const docRef = await addDoc(statementsRef, {
      ...statement,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  }

  // Atualizar fechamento
  async updateStatement(id: string, statement: Partial<CreditCardStatement>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, {
      ...statement,
      updatedAt: new Date()
    });
  }

  // Deletar fechamento
  async deleteStatement(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  // Obter resumo dos fechamentos por ano
  getYearSummary(cardName: string, year: number): Observable<CreditCardStatementSummary[]> {
    const statementsRef = collection(this.firestore, this.collectionName);
    const q = query(
      statementsRef,
      where('cardName', '==', cardName),
      where('year', '==', year),
      orderBy('month', 'desc')
    );

    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          cardName: data['cardName'],
          month: data['month'],
          year: data['year'],
          totalAmount: data['totalAmount'],
          paid: data['paid'],
          dueDate: data['dueDate'].toDate()
        } as CreditCardStatementSummary;
      }))
    );
  }
} 