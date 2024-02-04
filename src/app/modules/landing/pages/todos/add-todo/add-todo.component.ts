import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { TodosService } from 'src/app/core/services/todos.service';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty, resetForm } from 'src/app/core/utils/form';
import { maxLength } from 'src/app/core/validators/max';
import { minLength } from 'src/app/core/validators/min';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  @Input() userId: number | undefined;
  @Output() hideAddTodo = new EventEmitter<boolean>();
  form!: FormGroup;
  isValid: boolean = false;
  isLoading: boolean = false;
  subscriptions = new Subscription();

  constructor(private todosService: TodosService, private fb: FormBuilder, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.setForm();

    this.subscriptions.add(this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    }));
  }

  setForm() {
    this.form = this.fb.group({
      title: ['', 
      [required('validation.title-required'),
      minLength(5, 'validation.min-length'), 
      maxLength(30, 'validation.max-length')]
    ],
      description: ['', 
      [required('validation.description-required'),
      minLength(20, 'validation.min-length'), 
      maxLength(150, 'validation.max-length')]
    ],
    });
  }

  onSubmit() {
    if (this.isValid) {
      this.isLoading = true;
      const todo = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        completed: false,
        userId: this.userId
      }
      this.subscriptions.add(this.todosService.createTodo(todo).subscribe(() => {
        resetForm(this.form);
        this.isValid = false;
        this.isLoading = false;
        this.snackBar.openSnackBar('snackbar.todo-added', 2000, false);
        this.onHideAddTodo();
      }));
    } else {
      setFormAsDirty(this.form);
    }
  }

  onHideAddTodo() {
    this.hideAddTodo.emit(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}