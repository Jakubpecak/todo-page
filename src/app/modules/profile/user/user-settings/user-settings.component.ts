import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  @Input() openAccordionIndex: number | null = null;
  @Output() sendIndexNumber = new EventEmitter<number>();

  setOpenAccordion(index: number) {
    this.sendIndexNumber.emit(index);
  }
}
