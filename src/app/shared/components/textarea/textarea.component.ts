import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() placeholder!: string;
  @Input() control: any;
  @Input() label!: string;
  @Input() type!: string;

}
