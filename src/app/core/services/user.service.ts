import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  
  createUser(userData: User) {
    return this.http.post<User>(this.url, userData);
  }

  changePhotoUser(id: any, photo: any) {
    return this.http.patch(this.url + '/' + id, { photo });
  }
}
