
import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Credentials } from 'src/app/core/models/credentials';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: '',
    password: ''
  });

  isAuthenticate = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  login() {
    this.authService.login(this.loginForm.value as Credentials);
  }

  logout() {
    this.authService.logout();
  }

}
