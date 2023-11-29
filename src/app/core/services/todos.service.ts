import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject, debounceTime, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  private apiUrl = environment.apiUrl + 'todos';

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
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      tap(() => this.params.next(this.params.getValue()))
    );
  }

  editTodo(id: number | undefined, newTitle: Todo) {
    return this.http.patch(this.apiUrl + '/' + id, newTitle).pipe(
      tap(() => this.params.next(this.params.getValue()))
    );
  }

  deleteTodo(id: number) {
    return this.http.delete(this.apiUrl + '/' + id).pipe(
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
    if (sort === 'asc' || sort === 'desc') {
      this.params.next({
        ...this.params.getValue(),
        order: sort
      })
    } else {
      this.params.next({
        ...this.params.getValue(),
        sort
      })
    }
  }

  setTotalCount(total: number) {
    this.state = {
      total,
      pages: Math.ceil(total / this.params.getValue().perPage)
    }
  }

  getTodos() {
    return this.params.pipe(
      debounceTime(0),
      switchMap((params) => {
        return this.http.get<Todo[]>(this.apiUrl, {
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
    return this.http.get<Todo>(this.apiUrl + '/' + id);
  }

}