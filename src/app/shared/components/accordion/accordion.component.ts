import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '100px',
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.2s ease-out'),
      ]),
      transition('closed => open', [
        animate('0.2s ease-in'),
      ]),
    ]),
  ],
})
export class AccordionComponent {
  expandedIndex = 0;
  @Input() index: number = 0;
  @Input() title!: string;
  @Input() isOpen: boolean = false;
  @Output() toggleAccordion: EventEmitter<number> = new EventEmitter();

  onToggle() {
    this.toggleAccordion.emit(this.index);
  }
}
