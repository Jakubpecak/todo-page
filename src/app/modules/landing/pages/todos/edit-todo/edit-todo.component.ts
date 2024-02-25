import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { TodosService } from 'src/app/core/services/todos.service';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty, resetForm } from 'src/app/core/utils/form';
import { minLength } from 'src/app/core/validators/min';
import { maxLength } from 'src/app/core/validators/max';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/core/models/todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  @Input() todoList!: Todo[];
  @Input() selectedIndex!: number;
  @Output() hideEditTodo = new EventEmitter<boolean>();
  isValid: boolean = false;
  isLoading: boolean = false;
  subscriptions = new Subscription();

  constructor(private fb: FormBuilder, private todosService: TodosService, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.setForm();

    this.subscriptions.add(this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    }));
  }

  setForm() {
    this.form = this.fb.group({
      title: [this.todoList[this.selectedIndex].name, 
      [required('validation.title-required'),
      minLength(5, 'validation.min-length'), 
      maxLength(30, 'validation.max-length')]
    ],
      description: [this.todoList[this.selectedIndex].description, 
      [required('validation.description-required'),
      minLength(20, 'validation.min-length'), 
      maxLength(150, 'validation.max-length')]
    ],
    });
  }

  onSubmit() {
    if (this.isValid) {
      this.isLoading = true;
      if (this.todoList && (this.selectedIndex === 0 || this.selectedIndex)) {
        const { title, description } = this.form.value;
        const newTitle = { title, description };
        this.subscriptions.add(this.todosService.editTodo(this.todoList[this.selectedIndex].externalId, newTitle).subscribe(() => {
          resetForm(this.form);
          this.isValid = false;
          this.isLoading = false;
          this.snackBar.openSnackBar('snackbar.todo-updated', 2000, false);
          this.onHideEditTodo();
        }));
      }
    } else {
      setFormAsDirty(this.form);
    }
  }

  onHideEditTodo() {
    this.hideEditTodo.emit(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}