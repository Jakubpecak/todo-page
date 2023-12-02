import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() showMenu: boolean | undefined;
  @Input() isAuthenticated: boolean = false;
  @Input() authorizedMenuItems: any;
  @Input() notAuthorizedMenuItems: any;
  @Output() closeMenuEmitter = new EventEmitter<boolean>();
  @Output() userLoggedOut = new EventEmitter<boolean>();

  closeMenu() {
    this.closeMenuEmitter.emit();
  }

  logout() {
    this.closeMenuEmitter.emit();
    this.userLoggedOut.emit();
  }
}