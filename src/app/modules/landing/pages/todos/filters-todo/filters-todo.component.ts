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
    {value: 'asc', label: 'Ascending'},
    {value: 'desc', label: 'Descending'},
    {value: 'title', label: 'Title'},
    {value: 'createdAt', label: 'Date'}
  ];
  
  setSort(key: string) {
    this.todosService.setSort(key);
  }

}
