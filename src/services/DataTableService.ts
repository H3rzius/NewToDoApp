import {Category, Priority, Status, Todo} from "../models/todo";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class DataTableService {
  //public category_defaults: Category[] = [new Category('Hausarbeit'), new Category('Verein')];
  public categories: Category[] = [
    new Category('Hausarbeit'),
    new Category('Verein'),
    new Category('Schule'),
    new Category('Finanzen')
  ];
  public todos: Todo[] = [];

  public showExtraButtons = {key: "setting_showExtraButtons", description: "Lösch- und Klon-Button anzeigen", enabled: true};
  public sortList = {key: "setting_sortList", description: "Liste sortieren", enabled: true};

  public catName = "";
  public selected: Category | undefined;
  public searchText: string = "";
  public _messageBoxMessage: string | undefined;
  public _messageBoxType: number | undefined;

  constructor() {
    //localStorage.setItem("todos", JSON.stringify(this.todo_defaults));
    //localStorage.setItem("categories", JSON.stringify(this.category_defaults));

    let localCategories = localStorage.getItem("categories");
    if (localCategories !== null) {
      let list: Category[] = JSON.parse(localCategories!);
      list.forEach(category => {
        if (this.categories.find(e => e.name == category.name) === undefined) {
          this.categories.push(new Category(category.name));
        }
      });
    }
    let localTodos = localStorage.getItem("todos");
    if (localTodos !== null) {
      let list: Todo[] = JSON.parse(localTodos!);
      list.forEach(t => {
        let c: Category | undefined = this.categories.find(e => e.name == t.category.name);
        if (c === undefined) {
          return;
        }

        this.todos.push(this.prepareToDo(t,c));
      });
    }
    let setting_showExtraButtons = localStorage.getItem(this.showExtraButtons.key);
    if (setting_showExtraButtons !== null) {
      this.showExtraButtons.enabled = JSON.parse(setting_showExtraButtons!);
    }
    let setting_sortList = localStorage.getItem(this.sortList.key);
    if (setting_sortList !== null) {
      this.sortList.enabled = JSON.parse(setting_sortList!);
    }
  }

  private prepareToDo(t:Todo, c:Category): Todo {
    let todo = new Todo(t.id, t.name, t.until, c!);
    switch (t.priority.id) {
      case 1:
        todo.priority = Priority.HIGH;
        break;
      case 2:
        todo.priority = Priority.URGENT;
        break;
      default:
        todo.priority = Priority.UNASSIGNED;
        break;
    }
    switch (t.status.id) {
      case 1:
        todo.status = Status.IN_PROGRESS;
        break;
      case 2:
        todo.status = Status.DONE;
        break;
      default:
        todo.status = Status.NEW;
        break;
    }
    return todo;
  }

  public set messageBoxMessage(message: string) {
    this._messageBoxMessage = message;
    new Promise(resolve => setTimeout(resolve, 5000)).then(d => {
      if (this._messageBoxMessage == message) {
        this._messageBoxMessage = undefined;
      }
    });
  }

  public set messageBoxType(type: number) {
    this._messageBoxType = type;
    new Promise(resolve => setTimeout(resolve, 5000)).then(d => {
      if (this._messageBoxType == type) {
        this._messageBoxType = undefined;
      }
    });
  }

  public get messageBoxMessage(): string | undefined {
    return this._messageBoxMessage;
  }

  public get messageBoxType(): number | undefined {
    return this._messageBoxType;
  }

  public saveSetting(obj: {key: string, description: string, enabled: boolean}) {
    localStorage.setItem(obj.key, JSON.stringify(!obj.enabled));
  }

  public addCategory() {
    if (this.catName.length == 0) {
      this.messageBoxMessage = "Kategorie darf nicht leer sein";
      return;
    }
    if (this.categories.find(e => e.name == this.catName) !== undefined) {
      this.messageBoxMessage = "Diese Kategorie gibt es bereits";
      return;
    }
    this.categories.push(new Category(this.catName));
    localStorage.setItem("categories", JSON.stringify(this.categories));
    this.catName = "";
  }

  public findNextId(): number {
    let list: number[] = this.todos.map(todo => todo.id);
    let i = 1;
    while (list.includes(i)) {
      i++;
    }
    return i;
  }

  public delete(todo: Todo) {
    this.todos = this.todos.filter(e => e != todo);
    this.save();
    this.messageBoxMessage = "Todo wurde gelöscht";
    this.messageBoxType = 0;
  }

  public add(todo: Todo) {
    this.todos.push(todo);
    this.save();
    this.messageBoxMessage = "Todo wurde hinzugefügt";
    this.messageBoxType = 0;
  }

  public save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  public clone(todo: Todo) {
    let newTodo: Todo = new Todo(this.findNextId(), todo.name, todo.until, todo.category);
    this.add(newTodo);
    this.messageBoxMessage = "Todo wurde dupliziert"
    this.messageBoxType = 0;
  }

  public todoList() {
    let a = this.todos;
    if (this.sortList.enabled) {
      a = a.sort((a, b) => {
        if (a.status.id != b.status.id) {
          return b.status.id - a.status.id;
        }
        if (a.priority.id != b.priority.id) {
          return b.priority.id - a.priority.id;
        }
        return a.id - b.id;
      });
    }
    if (this.selected !== undefined) {
      a = a.filter(todo => todo.category == this.selected);
    }
    if (this.searchText.length != 0) {
      a = a.filter(todo => todo.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    return a;
  }
}
