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
import { NgCircleProgressModule } from 'ng-circle-progress';
import { UserProgressBarComponent } from './user/user-edit/user-progress-bar/user-progress-bar.component';
import { ProfileResolve } from 'src/app/core/guards/profile-resolve';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    UserEditComponent,
    UserBasicInfoComponent,
    UserContactComponent,
    UserSettingsComponent,
    UserProgressBarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    ImageCropperModule,
    HammerModule,
    NgCircleProgressModule.forRoot({
      backgroundColor: "#FDB900",
      backgroundPadding: 5,
      radius: 40,
      maxPercent: 200,
      units: "'%'",
      unitsFontWeight: "600",
      unitsColor: "#483500",
      outerStrokeWidth: 5,
      outerStrokeColor: "#FFFFFF",
      innerStrokeColor: "#FFFFFF",
      titleColor: "#483500",
      titleFontSize: "14",
      titleFontWeight: "600",
      subtitleColor: "#483500",
      subtitleFontWeight: "500",
      animationDuration: 1000,
      showUnits: true,
      showInnerStroke: false,
      responsive: true,
      showZeroOuterStroke: false,
      lazy: true})
  ],
  providers: [
    ProfileResolve
  ]
})
export class ProfileModule { }
