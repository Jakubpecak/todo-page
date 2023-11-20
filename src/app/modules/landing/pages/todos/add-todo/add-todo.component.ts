import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from 'src/app/core/services/todos.service';

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

  constructor(private todosService: TodosService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setForm();

    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  setForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.isValid) {
      const todo = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        completed: false,
        userId: this.userId
      }

      this.todosService.createTodo(todo).subscribe(() => {
        this.resetForm();
        this.isValid = false;
      });
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
