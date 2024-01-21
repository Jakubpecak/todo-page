
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { minLength } from 'src/app/core/validators/min';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty } from 'src/app/core/utils/form';
import { maxLength } from 'src/app/core/validators/max';
import { password } from 'src/app/core/validators/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string | null | undefined;
  isAuthenticate = false;
  isValid: boolean = false;
  form!: FormGroup;
  isLoading = false;
  subscriptions = new Subscription();

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setForm();

    this.subscriptions.add(this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    }));
  }

  setForm() {
    this.form = this.fb.group({
      username: ['', 
      [required('validation.username-required'), 
      minLength(3, 'Minimum length is {{length}} characters'), 
      maxLength(15, 'Maximum length is {{length}} characters')]
    ],
      password: ['', 
      [required('validation.password-required'), 
      minLength(5, 'Minimum length is {{length}} characters'), 
      maxLength(15, 'Maximum length is {{length}} characters'),
      password('validation.password-pattern')]
    ],
    });
  }

  login() {
    if (this.isValid) {
      this.isLoading = true;
      this.subscriptions.add(this.auth.login(this.form.value));
    } else {
      setFormAsDirty(this.form);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}