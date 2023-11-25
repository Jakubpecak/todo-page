import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Input() isValid: boolean= false;
  @Input() isLoading: boolean= false;
  @Input() isExtraButton: boolean= false;
  @Input() textButton: string = '';
}
