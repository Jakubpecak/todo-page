import { Component, Input } from '@angular/core';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() label!: string;
  @Input() placeholder!: string;

  constructor(private todosService: TodosService) {}
  
  search(query: string) {
    this.todosService.setQuery(query);
  }
}
