import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { required } from 'src/app/core/validators/required';
import { matchPassword } from 'src/app/core/validators/match';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { setFormAsDirty } from 'src/app/core/utils/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  newUser: User | null = null;
  isValid: boolean = false;
  password: string = '';
  isLoading: boolean = false;
  
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

    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
      this.password = this.form.get('password')?.value;
    });
  }

  getCurrentPassword = () => this.password;

  setForm() {
    this.form = this.fb.group({
      username: ['', [required('Username is required')]],
      email: ['', [required('Email is required')]],
      password: ['', [required('Password is required')]],
      repeatPassword: ['', [required('Repeat password is required'), matchPassword(this.getCurrentPassword, 'Password not match')]]
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
        completeProfile: 20,
        phone: null,
        company: {
          name: null
        },
        roles: ["USER"]
      };

      this.userService.createUser(this.newUser).subscribe(() => {
        this.isValid = false;
        this.isLoading = false;
        this.snackBar.openSnackBar('User created', 2000, false);
        this.router.navigate(['/login']);
      });
    } else {
        setFormAsDirty(this.form);
    }
  }

  back() {
    this.location.back();
  }

}
