import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty } from 'src/app/core/utils/form';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isValid: boolean = false;
  isLoading: boolean = false;
  completeProfile = 0;
  subscriptions = new Subscription();
  currentUser!: User | null;
  genderList: string[] = ['Man', 'Woman'];
  regionList: string[] = [];
  cityList: string[] = [];
  hideRegionInput: boolean = true;
  hideCityInput = true;

  constructor(
    private fb: FormBuilder, 
    private location: Location, 
    private userService: UserService, 
    private auth: AuthService, 
    private router: Router,
    private countryService: CountryService,
    private snackBar: SnackBarService
    ) {}

  ngOnInit(): void {
    this.setFormValue();
    this.currentUser = this.auth.getCurrentUser();


    this.subscriptions.add(this.form.get('address.country')?.valueChanges.subscribe((country) => {
      const countryValue = country.toLowerCase();
      this.setRegionList(countryValue);
    }));

    this.subscriptions.add(this.form.get('address.region')?.valueChanges.subscribe((region) => {
      if (!!region) {
        this.hideCityInput = false;
        this.setCityList(region);
      } else {
        this.hideCityInput = true;
      }
    }));
  }

  setRegionList(countryValue: string) {
    if (countryValue === 'poland') {
      this.hideRegionInput = false;
      this.countryService.getRegionList().subscribe((data) => {
        data.map((poland) => {
          this.regionList.push(poland.region);
        });
      });
    } else {
      this.form.get('address.region')?.reset();
      this.hideRegionInput = true;
      this.hideCityInput = true;
    }
  }

  setCityList(regionValue: string) {
    this.countryService.getRegionList().subscribe((data) => {
      data.map((poland) => {
        if (poland.region === regionValue) {
          this.cityList = poland.city;
        }
      });
    });
  }

  setFormValue() {
    this.form = this.fb.group({
      name: [null, [required('Name is required')]],
      gender: [null, [required('Gender is required')]],
      address: this.fb.group({
        country: [null, [required('Country is required')]],
        region: [null],
        city: [null],
        street: [null]
      }),
      birthDate: [null, [required('Date of birth is required')]],
      phone: [null, [required('Phone is required')]],
      email: [null, [required('Email is required')]]
    });
  }

  save() {
    if (this.isValid) {
      this.subscriptions.add(this.userService.updateUser(this.currentUser?.id, this.form.value).subscribe(() => {
        this.snackBar.openSnackBar('Profile updated', 2000, false);
        this.router.navigate(['/profile']);
      }));
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}