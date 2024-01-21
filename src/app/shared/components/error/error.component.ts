import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() control: any;
  @Input() controlName: any;
  @Input() message: string = "validation.invalid-value";

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    if (!this.control && !this.controlName) {
      throw new Error('Validation must have control or controlName inputs');
    } else {
      if (this.controlName && this.formGroup) {
        this.control = this.formGroup.form.get(this.controlName);
      }
    }
  }
}
