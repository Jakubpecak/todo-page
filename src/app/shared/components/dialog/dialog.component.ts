import { Subscription } from 'rxjs';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/core/models/todo';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  title: string = '';
  description: string = '';
  id!: number;
  isHistory: boolean | undefined = false;
  historyList: Todo[] = [];
  subscriptions = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string, id?: any, isHistory?: boolean }, 
  private todosService: TodosService) {}

  ngOnInit(): void {
    if (this.data) {
      const { title, description, id, isHistory } = this.data;
      this.title = title;
      this.description = description;
      this.id = id;
      this.isHistory = isHistory;
    }

    if (this.isHistory) {
      this.subscriptions.add(this.todosService.getHistoryTodos().subscribe((todos) => {
        this.historyList = todos.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}