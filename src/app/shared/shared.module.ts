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
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AccordionComponent } from './components/accordion/accordion.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { DataPickerComponent } from './components/data-picker/data-picker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { SelectComponent } from './components/select/select.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MenuListComponent } from './components/navigation/menu/menu-list/menu-list.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    ProfileBarComponent,
    MenuComponent,
    InputComponent,
    SearchComponent,
    TextareaComponent,
    AccordionComponent,
    PageNotFoundComponent,
    ErrorComponent,
    DialogComponent,
    ButtonsComponent,
    DataPickerComponent,
    SelectComponent,
    MenuListComponent
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
    MatSelectModule,
    CdkAccordionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
    MatSlideToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
    TextareaComponent,
    CdkAccordionModule,
    AccordionComponent,
    ErrorComponent,
    ButtonsComponent,
    DataPickerComponent,
    SelectComponent,
    LayoutModule
  ]
})
export class SharedModule { }