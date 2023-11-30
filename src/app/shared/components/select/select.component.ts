import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() label!: string;
  @Input() control: any;
  @Input() list!: string[];
  @Input() type!: string;
}
