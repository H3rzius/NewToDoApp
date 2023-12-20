import {Component, Input} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {DataTableService} from "../services/DataTableService";
import {Category, Priority, Todo} from "../models/todo";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  name = "";
  until: Date = new Date();
  category = this.dataTableService.categories[0];
  priority = Priority.UNASSIGNED;

  constructor(public dataTableService: DataTableService) {
  }

  public create() {
    if (this.name.length == 0) {
      this.dataTableService.messageBoxMessage = "Der Name darf nicht leer sein";
      this.dataTableService.messageBoxType = 1;
      return;
    }
    /*if (this.until.getTime() < new Date().getDate()) {
      this.dataTableService.messageBoxMessage = "Die Frist muss heute oder später sein";
      this.dataTableService.messageBoxType = 1;
      return;
    }*/
    let todo = new Todo(this.dataTableService.findNextId(), this.name, this.until, this.category!);
    todo.priority = this.priority;
    this.dataTableService.add(todo);
  }

  public defPrio() {
    this.priority = Priority.UNASSIGNED;
    return "checked";
  }

  protected readonly Priority = Priority;
  protected readonly Date = Date;
}
