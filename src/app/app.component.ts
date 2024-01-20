import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { DarkModeService } from './core/services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  darkMode: boolean;

  constructor(private auth: AuthService, private darkModeService: DarkModeService, private renderer: Renderer2, private el: ElementRef){
    this.darkMode = this.darkModeService.getDarkMode();

    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }

  ngOnInit(): void {
    this.auth.state.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  toggleDarkMode(darkMode: boolean) {
    this.darkModeService.toggleDarkMode();
    this.darkMode = this.darkModeService.getDarkMode();

    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

}