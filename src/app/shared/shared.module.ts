import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    ProfileBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [NavigationComponent, FooterComponent, ProfileBarComponent, MatButtonModule, ReactiveFormsModule]
})
export class SharedModule { }
