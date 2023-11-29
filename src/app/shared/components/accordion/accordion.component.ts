import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition('open <=> closed', [animate('0.3s ease-out')]),
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
