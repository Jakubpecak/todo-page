import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { required } from 'src/app/core/validators/required';
import { matchPassword } from 'src/app/core/validators/match';

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
  
  constructor(private fb: FormBuilder, private userService: UserService, private location: Location) {}

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
        phone: null,
        company: {
          name: null
        },
        roles: ["USER"]
      };

      this.userService.createUser(this.newUser).subscribe(() => {
        this.resetForm();
        this.isValid = false;
      });
    }
  }

  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null);
    });
  }

  back() {
    this.location.back();
  }

}
