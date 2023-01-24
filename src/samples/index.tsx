import { INumberType, IToDo, IToDoList } from "../types";

export const ToDoArray: IToDo[] = [
  {
    name: "Create some subtask",
    value: false
  },
  {
    name: "Create another subtask",
    value: true
  },
  {
    name: "This subtask is omg",
    value: false
  }
]

export const ToDoListSample = new IToDoList(ToDoArray)

export const NumberTypeSample = new INumberType('asd', false, 0, 5, 10)