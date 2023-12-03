import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  @Input() isAuthenticated: boolean = false;
  @Input() authorizedMenuItems: any;
  @Input() notAuthorizedMenuItems: any;
  @Output() closeMenuEmitter = new EventEmitter<boolean>();
  @Output() userLoggedOut = new EventEmitter<boolean>();

  
}
