import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() label!: string;
  @Input() placeholder!: string;
  form!: FormGroup;

  constructor(private todosService: TodosService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: ''
    });

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((form: any) => {
      this.search(form.search);
    });
  }
  
  search(query: string) {
    this.todosService.setQuery(query);
  }
}
