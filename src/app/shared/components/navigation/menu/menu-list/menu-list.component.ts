import { LanguageService } from './../../../../../core/services/language.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  isDefaultLang: boolean = true;
  @Input() isAuthenticated: boolean = false;
  @Input() authorizedMenuItems: any;
  @Input() notAuthorizedMenuItems: any;
  @Output() closeMenuEmitter = new EventEmitter<boolean>();
  @Output() userLoggedOut = new EventEmitter<boolean>();
  @Output() languageChanged = new EventEmitter<string>();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.checkCurentLanguage();
  }

  checkCurentLanguage() {
    const currentLanguage = this.languageService.getLanguage();
    if (currentLanguage === 'en') {
      this.isDefaultLang = true;
    } else {
      this.isDefaultLang = false;
    }
  }

  changeLanguage(language: string) {
    this.languageChanged.emit(language);
  }

  
}
