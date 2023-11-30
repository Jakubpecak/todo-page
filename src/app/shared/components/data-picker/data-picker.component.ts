import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss']
})
export class DataPickerComponent {
  @Input() label!: string;
  @Input() control: any;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;

  constructor() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

}
