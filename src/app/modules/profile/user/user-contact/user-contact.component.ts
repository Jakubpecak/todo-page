import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.scss']
})
export class UserContactComponent {
  @Input() openAccordionIndex: number | null = null;
  @Input() user!: User;
  @Output() sendIndexNumber = new EventEmitter<number>();

  setOpenAccordion(index: number) {
    this.sendIndexNumber.emit(index);
  }

}
