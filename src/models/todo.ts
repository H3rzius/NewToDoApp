import {formatDate} from "@angular/common";

export class Todo {

  public status = Status.NEW;
  public priority = Priority.UNASSIGNED;

  constructor(public id: number, public name: string, public until: Date, public category: Category) {
  }

  nextStatus() {
    if (this.status == Status.IN_PROGRESS) {
      this.status = Status.DONE;
    }
    if (this.status == Status.NEW) {
      this.status = Status.IN_PROGRESS;
    }
  }
}

export const Status = {
  NEW: {
    id: 1,
    button: "add",
    tooltip: "Neu"
  },
  IN_PROGRESS: {
    id: 2,
    button: "pending",
    tooltip: "In Bearbeitung"
  },
  DONE: {
    id: 0,
    button: "done",
    tooltip: "Fertig"
  }
}

export const Priority = {
  UNASSIGNED: {
    id: 0,
    tooltip: "Normal"
  },
  HIGH: {
    id: 1,
    tooltip: "Höhe Priorität"
  },
  URGENT: {
    id: 2,
    tooltip: "Dringend"
  }
}

export class Category {

  constructor(public name: string) {
  }
}
