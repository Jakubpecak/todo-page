import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty } from 'src/app/core/utils/form';

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

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    this.setFormValue();

    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  setFormValue() {
    this.form = this.fb.group({
      username: [null, [required('Username is required')]],
      address: this.fb.group({
        country: ['', [required('Country is required')]],
        city: ['', [required('City is required')]],
        street: [null, [required('Street is required')]]
      }),
      company: [null, [required('Company is required')]],
      phone: [null, [required('Phone is required')]],
      email: [null, [required('Email is required')]]
    });
  }

  save() {
    if (this.isValid) {

    } else {
      setFormAsDirty(this.form.get('address'));
      setFormAsDirty(this.form);
    }
  }

  back() {
    this.location.back();
  }

}
