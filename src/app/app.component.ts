import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { DarkModeService } from './core/services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  darkMode!: boolean;

  constructor(
    private auth: AuthService, 
    private darkModeService: DarkModeService, 
    private renderer: Renderer2,
    private translate: TranslateService
    ) {}

  ngOnInit(): void {
    this.auth.state.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.darkMode = this.darkModeService.getDarkMode();
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    };

    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
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