import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MenuComponent } from './components/navigation/menu/menu.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    ProfileBarComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [NavigationComponent, FooterComponent, ProfileBarComponent, MatButtonModule, ReactiveFormsModule]
})
export class SharedModule { }
