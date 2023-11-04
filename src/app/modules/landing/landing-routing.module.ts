import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './pages/home/home.component';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoComponent } from './pages/todos/todo/todo.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'todos', component: TodosComponent
      },
      {
        path: 'todo/:id', component: TodoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
