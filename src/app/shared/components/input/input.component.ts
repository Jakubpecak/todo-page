import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label!: string;
  @Input() control: any;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() hide!: boolean;

}
