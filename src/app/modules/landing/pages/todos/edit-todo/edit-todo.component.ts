import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private todosService: TodosService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: '',
      description: ''
    });
  }

  saveTodo() {
    if (this.todoList && (this.selectedIndex === 0 || this.selectedIndex)) {
      const { title, description } = this.form.value;
      const newTitle = { title, description };
      this.todosService.editTodo(this.todoList[this.selectedIndex].id, newTitle).subscribe();
    }
  }

  onHideEditTodo() {
    this.hideEditTodo.emit(false);
  }

}