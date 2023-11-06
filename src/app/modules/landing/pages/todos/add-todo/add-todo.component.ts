import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private todosService: TodosService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: '',
      description: ''
    });
  }

  createTodo() {
    const todo = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      completed: false,
      userId: this.userId
    }
    this.todosService.createTodo(todo).subscribe(() => {
      this.form.reset();
    });
  }

  onHideAddTodo() {
    this.hideAddTodo.emit(false);
  }

}
