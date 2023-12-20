import { Component } from '@angular/core';
import {DataTableService} from "../services/DataTableService";
import {Page} from "../app/app.component";
import {ComponentService} from "../services/ComponentService";
import {FormsModule} from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavBarComponent {

  constructor(public componentService: ComponentService, public dataTableService: DataTableService) {
  }

  protected readonly Page = Page;
}
