import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/models/todo';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoList: any;
  error: any;

  constructor(private todos: TodosService){}


  ngOnInit(): void {
  }

  addTodo(title: string) {
    this.todos.createTodo({ title }).subscribe();
  }



}
