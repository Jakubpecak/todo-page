import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { AuthorizedGuard } from 'src/app/core/guards/authorized.guard';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, canActivate: [AuthorizedGuard],
    children: [
      {
        path: '', component: UserComponent,
      },
      {
        path: 'edit/:id', component: UserEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
