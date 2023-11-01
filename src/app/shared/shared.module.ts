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
import {MatPaginatorModule} from '@angular/material/paginator';


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
    MatMenuModule,
    MatPaginatorModule
  ],
  exports: [NavigationComponent, FooterComponent, ProfileBarComponent, MatButtonModule, ReactiveFormsModule, MatPaginatorModule]
})
export class SharedModule { }
