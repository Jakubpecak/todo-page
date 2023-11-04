import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject, debounceTime, map, switchMap, tap } from 'rxjs';

interface Params {
  query: string;
  perPage: number;
  page: number;
  sort: string;
  order: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private url = 'http://localhost:3000/todos';

  params = new BehaviorSubject<Params>({
    query: '',
    perPage: 5,
    page: 1,
    sort: 'createdAt',
    order: 'desc'
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

  editTodo(id: number | undefined, newTitle: Todo) {
    return this.http.patch(this.url + '/' + id, newTitle).pipe(
      tap(() => this.params.next(this.params.getValue()))
    );
  }

  deleteTodo(id: number) {
    return this.http.delete(this.url + '/' + id).pipe(
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

  setSort(sort: string) {
    this.params.next({
      ...this.params.getValue(),
      sort
    })
  }

  setOrder(order: string) {
    this.params.next({
      ...this.params.getValue(),
      order
    })
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
            _page: params.page,
            _sort: params.sort,
            _order: params.order
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
  

  getTodo(id: number) {
    return this.http.get<Todo>(this.url + '/' + id);
  }

}