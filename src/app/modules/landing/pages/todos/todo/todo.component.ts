import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Todo } from 'src/app/core/models/todo';
import { TodosService } from 'src/app/core/services/todos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo: Observable<Todo> | undefined;

  constructor(private route: ActivatedRoute, private todosService: TodosService, private location: Location) {}

  ngOnInit(): void {
    this.todo = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.todosService.getTodo(id))
    );
  }

  goPrevPage() {
    this.location.back();
  }

}
