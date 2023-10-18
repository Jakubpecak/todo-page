import { HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Credentials } from 'src/app/core/models/credentials';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | undefined;
  loginForm = this.fb.group({
    username: '',
    password: ''
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  login() {
    this.authService.login(this.loginForm.value as Credentials).subscribe((response) => {
      console.log(response);
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        console.log(error.error);
        this.errorMessage = error.error;
      }
    });
  }

}
