import { Component, Input, OnDestroy } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-progress-bar',
  templateUrl: './user-progress-bar.component.html',
  styleUrls: ['./user-progress-bar.component.scss']
})
export class UserProgressBarComponent implements OnDestroy {
  @Input() completeProfile!: number;
  @Input() form!: FormGroup;
  @Output() validFieldsCount = new EventEmitter<number>();
  @Output() isValid = new EventEmitter<boolean>();
  subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.form.valueChanges.subscribe(() => {
      this.isValid.emit(this.form.valid);
      this.checkFieldsValid();
    }));
  }

  checkFieldsValid() {
    const fields = [
        'username',
        'address.country',
        'address.city',
        'address.street',
        'company',
        'phone',
        'email'
    ];
    const validCount = fields.reduce((count, field) => this.form.get(field)?.valid ? count + 1 : count, 0);
    if (this.form.valid) {
        this.completeProfile = 100;
    } else {
        const profileCompletionSteps = [7, 6, 5, 4, 3, 2, 1];
        const completionPercentages = [100, 85, 70, 55, 40, 25, 10];
        this.completeProfile = profileCompletionSteps.includes(validCount)
        ? completionPercentages[profileCompletionSteps.indexOf(validCount)] : 0;
    }
    this.validFieldsCount.emit(this.completeProfile);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
