import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { required } from 'src/app/core/validators/required';
import { matchPassword } from 'src/app/core/validators/match';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { setFormAsDirty } from 'src/app/core/utils/form';
import { minLength } from 'src/app/core/validators/min';
import { maxLength } from 'src/app/core/validators/max';
import { password } from 'src/app/core/validators/password';
import { email } from 'src/app/core/validators/email';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  newUser: User | null = null;
  isValid: boolean = false;
  password: string = '';
  isLoading: boolean = false;
  subscriptions = new Subscription();
  
  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private location: Location, 
    private router: Router,
    private snackBar: SnackBarService
    ) {}

  ngOnInit(): void {
    this.setForm();
    this.password = this.form.get('password')?.value;

    this.subscriptions.add(this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
      this.password = this.form.get('password')?.value;
    }));
  }

  getCurrentPassword = () => this.password;

  setForm() {
    this.form = this.fb.group({
      username: ['', 
      [required('validation.username-required'), 
      minLength(3, 'Minimum length is {{length}} characters'), 
      maxLength(15, 'Maximum length is {{length}} characters')]
      ],
      email: ['',
      [required('validation.email-required'),
      email('validation.email-invalid')]
      ],
      password: ['',
      [required('validation.password-required'), 
      minLength(5, 'Minimum length is {{length}} characters'), 
      maxLength(15, 'Maximum length is {{length}} characters'),
      password('validation.password-pattern')]
      ],
      repeatPassword: ['',
      [required('validation.repeat-password-required'), matchPassword(this.getCurrentPassword, 'validation.not-match')]
      ]
    });
  }

  registerUser() {
    if (this.isValid) {
      this.isLoading = true;
      const formData = this.form.value;

      this.newUser = {
        name: null,
        username: formData.username,
        email: formData.email,
        address: {
          street: null,
          city: null,
          country: null,
          geo: {
            lat: null,
            lng: null
          }
        },
        birthDate: null,
        completeProfile: 20,
        phone: null,
        company: {
          name: null
        },
        roles: ["USER"]
      };

      this.subscriptions.add(this.userService.createUser(this.newUser).subscribe(() => {
        this.isValid = false;
        this.isLoading = false;
        this.snackBar.openSnackBar('snackbar.user-created', 2000, false);
        this.router.navigate(['/login']);
      }));
    } else {
        setFormAsDirty(this.form);
    }
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
