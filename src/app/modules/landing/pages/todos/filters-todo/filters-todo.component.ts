import { Component } from '@angular/core';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-filters-todo',
  templateUrl: './filters-todo.component.html',
  styleUrls: ['./filters-todo.component.scss']
})
export class FiltersTodoComponent {
  selectedValue: string | undefined;

  filters = [
    {value: 'asc', label: 'Ascending'},
    {value: 'desc', label: 'Descending'},
    {value: 'title', label: 'Title'},
    {value: 'createdAt', label: 'Date'}
  ];

  constructor(private todosService: TodosService) {}
  
  setSort(sortKey: string) {
    this.todosService.setSort(sortKey);
  }

}
