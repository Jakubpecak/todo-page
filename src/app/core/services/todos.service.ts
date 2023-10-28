import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient, private auth: AuthService) { }


  createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo);
  }

  getTodos() {
   return this.http.get<Todo[]>(this.url);
  }

}
