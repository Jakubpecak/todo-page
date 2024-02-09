import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-progress-bar',
  templateUrl: './user-progress-bar.component.html',
  styleUrls: ['./user-progress-bar.component.scss']
})
export class UserProgressBarComponent implements OnDestroy, OnChanges {
  @Input() completeProfile!: number;
  @Input() form!: FormGroup;
  @Output() validFieldsCount = new EventEmitter<number>();
  @Output() isValid = new EventEmitter<boolean>();
  subscriptions = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['completeProfile']) {
      this.checkFieldsValid();
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(this.form.valueChanges.subscribe(() => {
      this.isValid.emit(this.form.valid);
      this.checkFieldsValid();
    }));

    this.checkFieldsValid();
  }

  checkFieldsValid() {
    const fields = [
        'name',
        'birthDate',
        'gender',
        'address.country',
        'phone',
        'email'
    ];
    const validCount = fields.reduce((count, field) => this.form.get(field)?.valid ? count + 1 : count, 0);
    if (this.form.valid) {
        this.completeProfile = 100;
    } else {
        const profileCompletionSteps = [6, 5, 4, 3, 2, 1];
        const completionPercentages = [100, 85, 70, 50, 35, 15];
        this.completeProfile = profileCompletionSteps.includes(validCount)
        ? completionPercentages[profileCompletionSteps.indexOf(validCount)] : 0;
    }
    this.validFieldsCount.emit(this.completeProfile);
    console.log('test', this.completeProfile)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
