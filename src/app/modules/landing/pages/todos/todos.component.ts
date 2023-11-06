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
  isAddTodo: boolean =  false;
  isEditTodo: boolean =  false;

  constructor(protected todosService: TodosService, private auth: AuthService){}

  ngOnInit(): void {
    this.getTodos();
    this.userId = this.auth.getCurrentUser()?.id;
  }

  editTodo(index: number) {
    this.selectedIndex = index;
    this.isEditTodo = true;
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

  handlePageEvent(event: PageEvent) {
    this.todosService.setPage(event.pageIndex + 1);
    this.todosService.setPerPage(event.pageSize);
  }

  onHideAddTodo(value: boolean) {
    this.isAddTodo = value;
  }

  onHideEditTodo(value: boolean) {
    this.isEditTodo = value;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}