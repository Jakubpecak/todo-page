import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-history-todo',
  templateUrl: './history-todo.component.html',
  styleUrls: ['./history-todo.component.scss']
})
export class HistoryTodoComponent {

  constructor(private dialog: MatDialog) {}

  openHistory() {
    const title = 'History Todo';
    const description = '';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title,
        description,
        isHistory: true
      }
    });
  }

}
