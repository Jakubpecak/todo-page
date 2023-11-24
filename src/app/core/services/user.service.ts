import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}
  
  createUser(userData: User) {
    return this.http.post<User>(this.apiUrl, userData);
  }

  changePhotoUser(id: any, photo: any) {
    return this.http.patch(this.apiUrl + '/' + id, { photo });
  }
}
