
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { minLength } from 'src/app/core/validators/min';
import { required } from 'src/app/core/validators/required';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string | null | undefined;
  isAuthenticate = false;
  isValid: boolean = false;
  form!: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setForm();

    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  setForm() {
    this.form = this.fb.group({
      username: ['', [required('Username is required'), minLength('Min. length 3')]],
      password: ['', required('Password is required')],
    });
  }

  login() {
    if (this.isValid) {
      this.auth.login(this.form.value);
    }
  }

}
