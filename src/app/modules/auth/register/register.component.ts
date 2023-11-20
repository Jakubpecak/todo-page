import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  newUser: User | null = null;
  isValid: boolean = false;
  
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.setForm();

    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  setForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
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

}
