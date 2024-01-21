import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  showMenu = false;
  isTablet!: boolean;
  @Input() darkMode!: boolean;
  @Input() isAuthenticated: boolean = false;
  @Output() darkModeToggled = new EventEmitter<boolean>();
  @Output() languageChanged = new EventEmitter<string>();

  authorizedMenuItems = [
    { label: 'navigation.home', routerLink: '/home' },
    { label: 'navigation.profile', routerLink: '/profile' },
    { label: 'navigation.todos', routerLink: '/todos' }
  ];

  notAuthorizedMenuItems = [
    { label: 'navigation.home', routerLink: '/home' },
    { label: 'navigation.login', routerLink: '/login' },
    { label: 'navigation.register', routerLink: '/register' },
  ];
  
  constructor(protected auth: AuthService) {}

  ngOnInit(): void {
    this.isTablet = window.innerWidth > 767;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.auth.logout();
  }

  toggleDarkMode() {
    this.darkModeToggled.emit(this.darkMode);
  }

  changeLanguage(language: string) {
    this.languageChanged.emit(language);
  }


}
