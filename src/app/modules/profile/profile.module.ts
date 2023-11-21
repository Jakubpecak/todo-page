import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    ImageCropperModule,
    HammerModule
  ]
})
export class ProfileModule { }
