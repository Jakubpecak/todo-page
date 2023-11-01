import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject, debounceTime, map, switchMap, tap } from 'rxjs';

interface Params {
  query: string;
  perPage: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private url = 'http://localhost:3000/todos';

  params = new BehaviorSubject<Params>({
    query: '',
    perPage: 5,
    page: 1
  });

  state = {
    total: 0,
    pages: 1
  }

  constructor(private http: HttpClient) { }

  createTodo(todo: Todo) {
    return this.http.post<Todo>(this.url, todo).pipe(
      tap(() => this.params.next(this.params.getValue()))
    );
  }

  editTodo(todoId: number | undefined, newTitle: Todo) {
    return this.http.patch(this.url + '/' + todoId, newTitle).pipe(
      tap(() => this.params.next(this.params.getValue()))
    );
  }

  deleteTodo(todoId: number) {
    return this.http.delete(this.url + '/' + todoId).pipe(
      tap(() => this.params.next(this.params.getValue()))
    );
  }

  setQuery(query: string) {
    this.params.next({
      ...this.params.getValue(),
      query,
      page: 1
    });
  }

  setPerPage(perPage: number) {
    this.params.next({
      ...this.params.getValue(),
      perPage
    });
  }

  setPage(page: number) {
    this.params.next({
      ...this.params.getValue(),
      page
    });
  }

  setTotalCount(total: number) {
    this.state = {
      total,
      pages: Math.ceil(total / this.params.getValue().perPage)
    }
  }

  getTodos() {
    return this.params.pipe(
      debounceTime(300),
      switchMap((params) => {
        return this.http.get<Todo[]>(this.url, {
          params: {
            q: params.query,
            _limit: params.perPage,
            _page: params.page
          },
          observe: 'response'
        })
      }),
      map((response: HttpResponse<Todo[]>) => {
        this.setTotalCount(Number(response.headers.get('X-Total-Count')))
        return response.body;
      })
    );
  }

}