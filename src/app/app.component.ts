import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from "../navbar/navbar.component";
import {TodoListComponent} from "../todo-list/todo-list.component";
import {SettingPageComponent} from "../setting-page/setting-page.component";
import {ComponentService} from "../services/ComponentService";
import {CategoryListComponent} from "../category-list/category-list.component";
import {MessageBoxComponent} from "../message-box/message-box.component";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, TodoListComponent, SettingPageComponent, CategoryListComponent, FormComponent, MessageBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public componentService: ComponentService) {
    title: "d";
  }

  protected readonly Page = Page;
}

export enum Page {
  LIST, NEW, SETTINGS
}
