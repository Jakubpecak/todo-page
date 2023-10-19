import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials';
import { Session } from '../models/session';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'login';
  private session = new BehaviorSubject<Session | null>(null);
  isAuthenticated = false;

  state = this.session.pipe(
    map((session) => session && !!session.token),
    tap((state) => (this.isAuthenticated = !!state))
  );

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const session: Session = JSON.parse(savedUser);
      this.session.next(session);
    }
  }

  getToken() {
    const session = this.session.getValue();
    return session && session.token;
  }

  getCurrentUser() {
    const session = this.session.getValue();
    return session && session.user;
  }

  login(credentials: Credentials) {
    this.http.post<Session>(this.apiUrl, credentials).subscribe((session) => {
      localStorage.setItem('currentUser', JSON.stringify(session));
      this.session.next(session);
      this.router.navigate(['/home']);
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.session.next(null);
    this.router.navigate(['/login']);
  }
}
