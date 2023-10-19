import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private user_request: Observable<User | null> | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile() {
    if (!this.user_request) {
      this.user_request = this.authService.state.pipe(
        filter(() => this.authService.isAuthenticated),
        map(() => this.authService.getCurrentUser())
      )
    }
    return this.user_request;
  }

  clearCache() {
    this.user_request = null;
  }

}
