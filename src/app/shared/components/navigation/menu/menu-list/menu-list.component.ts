import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  isDefaultLang: boolean = true;
  @Input() isAuthenticated: boolean = false;
  @Input() authorizedMenuItems: any;
  @Input() notAuthorizedMenuItems: any;
  @Output() closeMenuEmitter = new EventEmitter<boolean>();
  @Output() userLoggedOut = new EventEmitter<boolean>();
  @Output() languageChanged = new EventEmitter<string>();

  changeLanguage(language: string) {
    this.languageChanged.emit(language);
  }

  
}
