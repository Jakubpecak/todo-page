import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Todo } from 'src/app/core/models/todo';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy{
  todoList: Todo[] | null | undefined = [];
  options: number[] = [5, 10, 50];
  userId: number | undefined;
  selectedIndex!: number | null;
  subscriptions = new Subscription();

  constructor(protected todosService: TodosService, private auth: AuthService){}

  ngOnInit(): void {
    this.getTodos();
    this.userId = this.auth.getCurrentUser()?.id;
  }

  createTodo(title: string) {
    const todo = {
      title: title,
      description: 'description test 123 1212 3423232 32',
      completed: false,
      userId: this.userId
    }
    this.todosService.createTodo(todo).subscribe();
  }

  editTodo(index: number) {
    this.selectedIndex = index;
  }

  saveTodo(index: number) {
    if (this.todoList && this.selectedIndex === index) {
      const newTitle = { title: 'kogutcik' }
      this.todosService.editTodo(this.todoList[index].id, newTitle).subscribe(() => {
        this.selectedIndex = null;
      });
    }
  }

  deleteTodo(todoId: any) {
    this.todosService.deleteTodo(todoId).subscribe();
  }

  getTodos() {
    this.subscriptions.add(this.todosService.getTodos().subscribe((todos) => {
      this.todoList = todos;
    }));
  }

  search(query: string) {
    this.todosService.setQuery(query);
  }

  setOrder(order: string) {
    this.todosService.setOrder(order);
  }
  
  setSort(sortKey: string) {
    this.todosService.setSort(sortKey);
  }

  handlePageEvent(event: PageEvent) {
    this.todosService.setPage(event.pageIndex + 1);
    this.todosService.setPerPage(event.pageSize);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}