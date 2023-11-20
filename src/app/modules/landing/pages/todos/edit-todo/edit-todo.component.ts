import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/core/models/todo';
import { TodosService } from 'src/app/core/services/todos.service';

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

  constructor(private fb: FormBuilder, private todosService: TodosService) {}

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
      if (this.todoList && (this.selectedIndex === 0 || this.selectedIndex)) {
        const { title, description } = this.form.value;
        const newTitle = { title, description };
        this.todosService.editTodo(this.todoList[this.selectedIndex].id, newTitle).subscribe(() => {
          this.resetForm();
          this.isValid = false;
        });
      }
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