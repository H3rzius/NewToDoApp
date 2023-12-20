import {Component} from '@angular/core';
import {DataTableService} from "../services/DataTableService";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Priority, Status, Todo} from "../models/todo";
import {CategoryListComponent} from "../category-list/category-list.component";
import {SelectDropDownModule} from "ngx-select-dropdown";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    DatePipe,
    CategoryListComponent,
    SelectDropDownModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  constructor(public dataTableService: DataTableService) {
  }

  nextStatus(todo: Todo) {
    todo.nextStatus();
  }

  getStatusTooltip(todo: Todo): string {
    return todo.status.tooltip;
  }

  protected readonly Priority = Priority;
  protected readonly Status = Status;
}
