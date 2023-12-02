import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  @Input() isAuthenticated: boolean = false;
  showMenu = false;
  isTablet!: boolean;

  authorizedMenuItems = [
    { label: 'Home', routerLink: '/' },
    { label: 'Profile', routerLink: '/profile' },
    { label: 'Todos', routerLink: '/todos' }
  ];

  notAuthorizedMenuItems = [
    { label: 'Home', routerLink: '/' },
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


}
