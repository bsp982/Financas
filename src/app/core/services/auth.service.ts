import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: BehaviorSubject<any> = new BehaviorSubject(null);
  userData$: Observable<any> = this.userData.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      this.userData.next(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // Login com email e senha
  login(email: string, password: string): Observable<void> {
    return new Observable(observer => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Registro de novo usuário
  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['/dashboard']);
        return result;
      })
      .catch(error => {
        throw error;
      });
  }

  // Logout
  logout(): Observable<void> {
    return new Observable(observer => {
      this.afAuth.signOut()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Verificar se usuário está logado
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  // Obter usuário atual
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
} 