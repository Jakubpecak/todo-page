import { take } from 'rxjs';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { DarkModeService } from './core/services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  darkMode!: boolean;
  language!: string;

  constructor(
    private auth: AuthService, 
    private darkModeService: DarkModeService, 
    private languageService: LanguageService,
    private renderer: Renderer2,
    private translate: TranslateService
    ) {}

  ngOnInit(): void {
    this.auth.state.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.setDarkMode();
    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    this.languageService.getLanguage().pipe(take(1)).subscribe(lang => {
      if (!!lang) {
        this.language = lang;
        this.translate.use(this.language);
      } else {
        this.language = 'en';
        this.translate.use('en');
      }
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.languageService.setStorage(lang);
  }

  setDarkMode() {
    this.darkMode = this.darkModeService.getDarkMode();
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    };
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
    this.darkMode = this.darkModeService.getDarkMode();
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

}