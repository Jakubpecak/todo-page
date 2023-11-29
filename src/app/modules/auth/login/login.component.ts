
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { minLength } from 'src/app/core/validators/min';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty } from 'src/app/core/utils/form';

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
      username: ['', [required('Username is required'), minLength('Min. length 3')]],
      password: ['', required('Password is required')],
    });
  }

  login() {
    if (this.isValid) {
      this.isLoading = true;
      this.subscriptions.add(this.auth.login(this.form.value));
    } else {
      console.log('test')
      setFormAsDirty(this.form);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}