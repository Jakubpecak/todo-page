import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() showMenu: boolean | undefined;
  @Output() closeMenuEmitter = new EventEmitter<boolean>();
  @Output() userLoggedOut = new EventEmitter<boolean>();
  @Input() isAuthenticated: boolean = false;

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

  closeMenu() {
    this.closeMenuEmitter.emit();
  }

  logout() {
    this.closeMenuEmitter.emit();
    this.userLoggedOut.emit();
  }
}