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

interface Session {
  token: string | null;
  user: User | null;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private session = new BehaviorSubject<Session | null>(this.getStoredSession());
  private apiUrl: string = environment.apiUrl;
  isAuthenticated = false;

  state = this.session.pipe(
    map((session) => !!session && !!session.token),
    tap((state) => {
      console.log('isAuthenticated', state)
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

  login(credentials: Credentials) {
    this.http.post<Session>(this.apiUrl + 'login', credentials).subscribe({
      next: (session: Session) => {
        this.session.next(session);
        this.storeSession(session);
        this.router.navigate(['/profile']);
        this.snackBar.openSnackBar('Success login', 2000, false);
      },
      error: err => {
        if(err instanceof HttpErrorResponse) {
          console.error(err.error);
        }
      }
    })
  }

  logout(message?: string) {
    localStorage.removeItem('session');
    this.router.navigate(['/login']);
    const session = this.session.getValue();
    this.snackBar.openSnackBar('Success logout', 2000, false);
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