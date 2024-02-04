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
  historyList!: Todo[] | undefined;
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
      this.subscriptions.add(this.todosService.getAllTodos().subscribe((todos) => {
        this.historyList = todos?.filter(todo => todo.completed);
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}