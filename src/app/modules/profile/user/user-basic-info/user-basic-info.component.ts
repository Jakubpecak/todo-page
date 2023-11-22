import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-basic-info',
  templateUrl: './user-basic-info.component.html',
  styleUrls: ['./user-basic-info.component.scss']
})
export class UserBasicInfoComponent {
  @Input() openAccordionIndex: number | null = null;
  @Output() sendIndexNumber = new EventEmitter<number>();

  setOpenAccordion(index: number) {
    this.sendIndexNumber.emit(index);
  }

}

