import { Component, Input } from '@angular/core';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-filters-todo',
  templateUrl: './filters-todo.component.html',
  styleUrls: ['./filters-todo.component.scss']
})
export class FiltersTodoComponent {
  @Input() label!: string;
  selectedValue: string | undefined;

  constructor(private todosService: TodosService) {}

  filters = [
    {value: 'asc', label: 'sort.ascending'},
    {value: 'desc', label: 'sort.descending'},
    {value: 'title', label: 'sort.title'},
    {value: 'createdAt', label: 'sort.date'}
  ];
  
  setSort(key: string) {
    this.todosService.setSort(key);
  }

}
