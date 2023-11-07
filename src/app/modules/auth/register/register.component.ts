import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    });
  }

  createUser() {
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

    this.userService.createUser(this.newUser).subscribe();
  }

}
