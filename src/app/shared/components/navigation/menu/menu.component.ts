import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() showMenu: boolean | undefined;
  @Output() closeMenuEmitter = new EventEmitter<boolean>();

  menuItems = [
    { label: 'Profile', routerLink: '/profile' },
    { label: 'Todos', routerLink: '/todos' },
    { label: 'Blog', routerLink: '/blog' },
  ];

  closeMenu() {
    this.closeMenuEmitter.emit();
  }
}