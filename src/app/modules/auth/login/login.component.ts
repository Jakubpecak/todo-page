
import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string | null | undefined;
  isAuthenticate = false;

  form: FormGroup = this.fb.group({
    username: '',
    password: ''
  });

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  login() {
    this.auth.login(this.form.value);
  }

}
