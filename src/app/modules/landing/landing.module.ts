import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoComponent } from './pages/todos/todo/todo.component';
import { AddTodoComponent } from './pages/todos/add-todo/add-todo.component';
import { FiltersTodoComponent } from './pages/todos/filters-todo/filters-todo.component';
import { EditTodoComponent } from './pages/todos/edit-todo/edit-todo.component';
import { HistoryTodoComponent } from './pages/todos/history-todo/history-todo.component';


@NgModule({
  declarations: [
    LandingComponent,
    TodosComponent,
    TodoComponent,
    AddTodoComponent,
    FiltersTodoComponent,
    EditTodoComponent,
    HistoryTodoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
