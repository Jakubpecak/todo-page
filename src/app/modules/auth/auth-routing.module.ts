import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedGuard } from 'src/app/core/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      {
        path: 'login', component: LoginComponent, canActivate: [NotAuthorizedGuard]
      },
      {
        path: 'register', component: RegisterComponent, canActivate: [NotAuthorizedGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
