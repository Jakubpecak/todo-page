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
  @Output() toggleDarkModeEmit = new EventEmitter<boolean>();

  authorizedMenuItems = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Profile', routerLink: '/profile' },
    { label: 'Todos', routerLink: '/todos' }
  ];

  notAuthorizedMenuItems = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Login', routerLink: '/login' },
    { label: 'Register', routerLink: '/register' },
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
    this.toggleDarkModeEmit.emit(this.darkMode);
  }


}
