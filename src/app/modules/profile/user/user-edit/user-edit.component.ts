import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty } from 'src/app/core/utils/form';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  form!: FormGroup;
  isValid: boolean = false;
  isLoading: boolean = false;
  completeProfile = 0;
  subscriptions = new Subscription();
  currentUser!: User | null;

  constructor(
    private fb: FormBuilder, 
    private location: Location, 
    private userService: UserService, 
    private auth: AuthService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    this.setFormValue();
    this.currentUser = this.auth.getCurrentUser();
    console.log(this.currentUser)
  }

  setFormValue() {
    this.form = this.fb.group({
      name: [null, [required('Name is required')]],
      address: this.fb.group({
        country: [null, [required('Country is required')]],
        city: [null, [required('City is required')]],
        street: [null, [required('Street is required')]]
      }),
      company: [null, [required('Company is required')]],
      phone: [null, [required('Phone is required')]],
      email: [null, [required('Email is required')]]
    });
  }

  save() {
    if (this.isValid) {
      this.userService.updateUser(this.currentUser?.id, this.form.value).subscribe(() => {
        this.router.navigate(['/profile']);
      });
    } else {
      setFormAsDirty(this.form.get('address'));
      setFormAsDirty(this.form);
    }
  }

  back() {
    this.location.back();
  }

  handleValidFieldsCount(count: number) {
    this.completeProfile = count;
  }

}
