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
  todoList: Todo[] | null | undefined = [];
  options: number[] = [5, 10, 25];
  userId: number | undefined;
  selectedIndex!: number | null;
  subscriptions = new Subscription();
  isAddTodo: boolean =  false;
  isEditTodo: boolean =  false;
  todoId: number = 0;
  isAgree: boolean =  false;
  currentTodo!: Todo;

  constructor(protected todosService: TodosService, private auth: AuthService, public dialog: MatDialog, private snackBar: SnackBarService){}

  ngOnInit(): void {
    this.getTodos();
    this.userId = this.auth.getCurrentUser()?.id;
  }

  editTodo(index: number) {
    this.selectedIndex = index;
    this.isEditTodo = true;
  }

  deleteTodo(todoId: any) {
    this.todoId = todoId;
    if (!this.isAgree) {
      this.todosService.getTodo(this.todoId).subscribe((todo) => {
        this.currentTodo = todo;
      });
    }
    if (this.isAgree) {
      this.subscriptions.add(this.todosService.deleteTodo(todoId).subscribe(() => {
        this.isAgree = false;
        this.todosService.addHistoryTodo(this.currentTodo);
        this.snackBar.openSnackBar('Todo deleted', 2000, true);
      }));
    } else {
      this.openDialog();
    }
  }

  getTodos() {
    this.subscriptions.add(this.todosService.getTodos().subscribe((todos) => {
      this.todoList = todos;
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
    const title = 'Delete Todo';
    const description = 'Are you sure you want to proceed with this action?';
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