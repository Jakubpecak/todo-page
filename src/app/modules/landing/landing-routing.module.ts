import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './pages/home/home.component';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoComponent } from './pages/todos/todo/todo.component';
import { AuthorizedGuard } from 'src/app/core/guards/authorized.guard';
import { TodosResolve } from 'src/app/core/guards/todos-resolve';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'todos', component: TodosComponent, canActivate: [AuthorizedGuard]
      },
      {
        path: 'todo/:id', component: TodoComponent
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
