import { Subscription } from 'rxjs';
import { LanguageService } from './../../../../../core/services/language.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, OnDestroy {
  isDefaultLang: boolean = true;
  @Input() isAuthenticated: boolean = false;
  @Input() authorizedMenuItems: any;
  @Input() notAuthorizedMenuItems: any;
  @Output() closeMenuEmitter = new EventEmitter<boolean>();
  @Output() userLoggedOut = new EventEmitter<boolean>();
  @Output() languageChanged = new EventEmitter<string>();
  subscriptions = new Subscription();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.checkCurentLanguage();
  }

  checkCurentLanguage() {
    const currentLanguage = this.languageService.getLanguage();
    this.subscriptions.add(currentLanguage.subscribe((language) => {
      if (language === 'en') {
        this.isDefaultLang = true;
      } else {
        this.isDefaultLang = false;
      }
    }));
  }

  changeLanguage(language: string) {
    this.languageChanged.emit(language);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
}