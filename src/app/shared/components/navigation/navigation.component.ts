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

  constructor(protected auth: AuthService) {}

  ngOnInit(): void {

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }


}
