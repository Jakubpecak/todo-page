import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userRequest: Observable<User | null> | null = null;

  constructor(private auth: AuthService) {}

  getUserProfile(): Observable<User | null> {
    if (!this.userRequest) {
      this.userRequest = this.auth.state.pipe(
        filter(() => this.auth.isAuthenticated),
        map(() => this.auth.getCurrentUser()),
      )
    }
    return this.userRequest;
  }

  clearCache(): void {
    this.userRequest = null;
  }
}