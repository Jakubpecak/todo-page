import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/core/models/todo';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { TodosService } from 'src/app/core/services/todos.service';
import { required } from 'src/app/core/validators/required';
import { setFormAsDirty } from 'src/app/core/utils/form';
import { minLength } from 'src/app/core/validators/min';
import { maxLength } from 'src/app/core/validators/max';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  form!: FormGroup;
  @Input() todoList: Todo[] | null | undefined = [];
  @Input() selectedIndex!: number | null;
  @Output() hideEditTodo = new EventEmitter<boolean>();
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private todosService: TodosService, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.setForm();

    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  setForm() {
    this.form = this.fb.group({
      title: ['', 
      [required('Title is required'),
      minLength(5, 'Minimum length is 5 characters'), 
      maxLength(30, 'Maximum length is 30 characters')]
    ],
      description: ['', 
      [required('Description is required'),
      minLength(20, 'Minimum length is 20 characters'), 
      maxLength(150, 'Maximum length is 150 characters')]
    ],
    });
  }

  onSubmit() {
    if (this.isValid) {
      this.isLoading = true;
      if (this.todoList && (this.selectedIndex === 0 || this.selectedIndex)) {
        const { title, description } = this.form.value;
        const newTitle = { title, description };
        this.todosService.editTodo(this.todoList[this.selectedIndex].id, newTitle).subscribe(() => {
          this.resetForm();
          this.isValid = false;
          this.isLoading = false;
          this.snackBar.openSnackBar('Todo edited', 2000, false);
          this.onHideEditTodo();
        });
      }
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

  onHideEditTodo() {
    this.hideEditTodo.emit(false);
  }

}