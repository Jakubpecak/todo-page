import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient, private auth: AuthService) {}
  
  createUser(userData: User) {
    return this.http.post<User>(this.apiUrl, userData);
  }

  changePhotoUser(id: any, photo: any) {
    return this.http.patch(this.apiUrl + '/' + id, { photo });
  }

  deleteUser(userId: number) {
    return this.http.delete<User>(this.apiUrl + '/' + userId).subscribe(() => {
      this.auth.logout('', true);
    });
  }
}
