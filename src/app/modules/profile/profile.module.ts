import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HammerModule } from '@angular/platform-browser';
import { UserBasicInfoComponent } from './user/user-basic-info/user-basic-info.component';
import { UserContactComponent } from './user/user-contact/user-contact.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { UserProgressBarComponent } from './user/user-progress-bar/user-progress-bar.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    UserEditComponent,
    UserBasicInfoComponent,
    UserContactComponent,
    UserSettingsComponent,
    UserProgressBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    ImageCropperModule,
    HammerModule,
  ]
})
export class ProfileModule { }
