import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { SnackBarService } from './snack-bar.service';

interface Credentials {
  username: string;
  password: string;
}

export interface Session {
  token: string | null;
  user: User | null;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private session = new BehaviorSubject<Session | null>(this.getStoredSession());
  isAuthenticated = false;

  state = this.session.pipe(
    map((session) => !!session && !!session.token),
    tap((state) => {
      this.isAuthenticated = state
    })
  );

  constructor(private http: HttpClient, private router: Router, private snackBar: SnackBarService) {}

  getToken() {
    const session = this.session.getValue();
    return session && session.token;
  }

  getCurrentUser() {
    const session = this.session.getValue();
    return session && session.user;
  }

  getMessage() {
    const session = this.session.getValue();
    return session && session.message;
  }

  updateCurrentUser(newData: User) {
    const session = this.session.getValue();
    if (session) {
      const update = {
        ...session,
        user: newData
      };
      this.session.next(update);
      this.storeSession(update);
    } 
  }

  login(credentials: Credentials) {
    this.http.post<Session>(this.apiUrl + 'login', credentials).subscribe({
      next: (session: Session) => {
        this.session.next(session);
        this.storeSession(session);
        this.router.navigate(['/profile']);
        this.snackBar.openSnackBar('snackbar.success-login', 2000, false);
      },
      error: err => {
        if(err instanceof HttpErrorResponse) {
          console.error(err.error);
        }
      }
    })
  }

  logout(message?: string, isDeleted?: boolean) {
    localStorage.removeItem('session');
    this.router.navigate(['/login']);
    const session = this.session.getValue();
    isDeleted ? this.snackBar.openSnackBar('snackbar.account-deleted', 2000, true) : this.snackBar.openSnackBar('snackbar.success-logout', 2000, false);
    if (session) {
      this.session.next({
        ...session,
        token: null,
        message
      });
    }
  }

  private storeSession(session: Session) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  private getStoredSession(): Session | null {
    const storedSession = localStorage.getItem('session');
    return storedSession ? JSON.parse(storedSession) : null;
  }
}