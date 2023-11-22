import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.scss']
})
export class UserContactComponent {
  @Input() openAccordionIndex: number | null = null;
  @Output() sendIndexNumber = new EventEmitter<number>();

  setOpenAccordion(index: number) {
    this.sendIndexNumber.emit(index);
  }

}
