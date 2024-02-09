import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Todo } from 'src/app/core/models/todo';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodosService } from 'src/app/core/services/todos.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy{
  todoList!: Todo[];
  options: number[] = [5, 10, 25];
  userId: number | undefined;
  selectedIndex!: number;
  subscriptions = new Subscription();
  isAddTodo: boolean =  false;
  isEditTodo: boolean =  false;
  todoId: number = 0;
  isAgree: boolean =  false;
  currentTodo!: Todo;
  isLoading: boolean = true;

  constructor(protected todosService: TodosService, private auth: AuthService, public dialog: MatDialog, private snackBar: SnackBarService){}

  ngOnInit(): void {
    this.getTodos();
    this.userId = this.auth.getCurrentUser()?.id;
  }

  completeTodo(todoId: any, completeTodo: Todo) {
    const completedTodo = {
      title: completeTodo.title,
      completed: true,
      userId: completeTodo.userId,
      description: completeTodo.description,
      createdAt: completeTodo.createdAt
    };
    this.subscriptions.add(this.todosService.addHistoryTodo(completedTodo).subscribe(() => {
      this.todosService.deleteTodo(todoId).subscribe();
      this.snackBar.openSnackBar('snackbar.todo-completed', 2000, false);
    }));
  }

  editTodo(index: number) {
    this.selectedIndex = index;
    this.isEditTodo = true;
  }

  deleteTodo(todoId: any) {
    this.todoId = todoId;
    if (!this.isAgree) {
      this.subscriptions.add(this.todosService.getTodo(this.todoId).subscribe((todo) => {
        this.currentTodo = todo;
      }));
    }
    if (this.isAgree) {
      this.subscriptions.add(this.todosService.deleteTodo(todoId).subscribe(() => {
        this.isAgree = false;
        this.todosService.addHistoryTodo(this.currentTodo);
        this.snackBar.openSnackBar('snackbar.todo-deleted', 2000, true);
      }));
    } else {
      this.openDialog();
    }
  }

  getTodos() {
    this.subscriptions.add(this.todosService.getTodos().subscribe((todos: any) => {
      this.todoList = todos;
      this.isLoading = false;
    }));
  }

  handlePageEvent(event: PageEvent) {
    this.todosService.setPage(event.pageIndex + 1);
    this.todosService.setPerPage(event.pageSize);
  }

  onHideAddTodo(value: boolean) {
    this.isAddTodo = value;
  }

  onHideEditTodo(value: boolean) {
    this.isEditTodo = value;
  }

  openDialog(): void {
    const title = 'dialog.delete-todo';
    const description = 'dialog.delete-todo-description';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title,
        description,
      },
      disableClose: true
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAgree = true;
        this.deleteTodo(this.todoId);
      } else {
          this.isAgree = false;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}