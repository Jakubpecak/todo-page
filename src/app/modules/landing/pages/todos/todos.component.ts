import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Todo } from 'src/app/core/models/todo';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoList: Todo[] | null | undefined = [];
  options: number[] = [5, 10, 50];
  userId: number | undefined;
  selectedIndex!: number | null;

  constructor(protected todosService: TodosService, private auth: AuthService){}

  ngOnInit(): void {
    this.getTodos();
    this.userId = this.auth.getCurrentUser()?.id;
  }

  createTodo(title: string) {
    const todo = {
      title: title,
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
      const newTitle = { title: 'Test kuba 12356' }
      this.todosService.editTodo(this.todoList[index].id, newTitle).subscribe(() => {
        this.selectedIndex = null;
      });
    }
  }

  deleteTodo(id: any) {
    this.todosService.deleteTodo(id).subscribe();
  }

  getTodos() {
    this.todosService.getTodos().subscribe((todos) => {
      this.todoList = todos;
      console.log(todos)
    });
  }

  search(query: string) {
    this.todosService.setQuery(query);
  }

  handlePageEvent(event: PageEvent) {
    console.log(event)
    this.todosService.setPage(event.pageIndex + 1);
    this.todosService.setPerPage(event.pageSize);
  }

}