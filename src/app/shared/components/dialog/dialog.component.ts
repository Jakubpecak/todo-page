import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  title: string = '';
  description: string = '';
  id!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string, id?: any }) {}

  ngOnInit(): void {
    if (this.data) {
      const { title, description, id } = this.data;
      this.title = title;
      this.description = description;
      this.id = id;
    }
  }
}
