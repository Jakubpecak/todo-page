import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { TodosService } from 'src/app/core/services/todos.service';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty } from 'src/app/core/utils/form';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @Input() userId: number | undefined;
  @Output() hideAddTodo = new EventEmitter<boolean>();
  form!: FormGroup;
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(private todosService: TodosService, private fb: FormBuilder, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.setForm();

    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  setForm() {
    this.form = this.fb.group({
      title: ['', required('Title is required')],
      description: ['', required('Description is required')],
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

      this.todosService.createTodo(todo).subscribe(() => {
        this.resetForm();
        this.isValid = false;
        this.isLoading = false;
        this.snackBar.openSnackBar('Todo added', 2000, false);
        this.onHideAddTodo();
      });
    } else {
      setFormAsDirty(this.form);
    }
  }

  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null);
    });
  }

  onHideAddTodo() {
    this.hideAddTodo.emit(false);
  }

}
