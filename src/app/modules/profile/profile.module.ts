import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
