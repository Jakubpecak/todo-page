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
import { minLength } from 'src/app/core/validators/min';
import { maxLength } from 'src/app/core/validators/max';
import { email } from 'src/app/core/validators/email';

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
        this.regionList = data
        .filter(country => country.region)
        .map(country => country.region as string);
      });
    } else {
      this.form.get('address.region')?.reset();
      this.hideRegionInput = true;
      this.hideCityInput = true;
    }
  }

  setCityList(regionValue: string) {
    this.countryService.getRegionList().subscribe((data) => {
      const found = data.find(country => country.region === regionValue && country.city);
      this.cityList = found && found.city ? found.city : [];
    });
  }

  setFormValue() {
    this.currentUser = this.auth.getCurrentUser();
    this.form = this.fb.group({
      name: [this.currentUser?.name, 
        [required('validation.name-required'), 
        minLength(3, 'validation.min-length'), 
        maxLength(15, 'validation.max-length')]
        ],
      gender: [this.currentUser?.gender, [required('validation.gender-required')]],
      address: this.fb.group({
        country: [this.currentUser?.address?.country, [
          required('validation.country-required'), 
          minLength(3, 'validation.min-length'),
          maxLength(15, 'validation.max-length')]
        ],
        region: [this.currentUser?.address?.region],
        city: [this.currentUser?.address?.city],
        street: [this.currentUser?.address?.street]
      }),
      birthDate: [this.currentUser?.birthDate, [
        required('validation.date-of-birth-required'), 
        minLength(3, 'validation.min-length')]
      ],
      phone: [this.currentUser?.phone, 
        [required('validation.phone-required'), 
        minLength(3, 'validation.min-length'), 
        maxLength(15, 'validation.max-length')]
      ],
      email: [this.currentUser?.email, [
        required('validation.email-required'), 
        minLength(3, 'validation.min-length'),
        email('validation.email-invalid')]
      ]
    });
  }

  save() {
    if (this.isValid) {
      this.isLoading = true;
      this.subscriptions.add(this.userService.updateUser(this.currentUser?.id, this.form.value).subscribe((newData) => {
        this.auth.updateCurrentUser(newData);
        this.snackBar.openSnackBar('snackbar.profile-updated', 2000, false);
        this.isLoading = false;
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