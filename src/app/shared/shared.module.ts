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
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { InputComponent } from './components/input/input.component';
import { SearchComponent } from './components/search/search.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    ProfileBarComponent,
    MenuComponent,
    InputComponent,
    SearchComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    NavigationComponent, 
    FooterComponent, 
    ProfileBarComponent, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatPaginatorModule, 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    InputComponent,
    SearchComponent,
    TextareaComponent
  ]
})
export class SharedModule { }
