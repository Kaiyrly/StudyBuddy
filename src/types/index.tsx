export const NUMBER_TYPE = "Number Type"
export const TODO_TYPE = "ToDo Type"
export const BOOLEAN_TYPE = "Boolean Type"

export interface IGoal {
  name: string
  id: string
  tasks: ITask[]
}

export interface ITask {
  name: string
  value: IToDoList | INumberType
  goalId: string
  id: string
}

export class IToDoList {
  value: IToDo[]
  constructor(value: IToDo[]) {
    this.value = value
  }
}

export interface IToDo {
  name: string
  value: boolean
}

export class INumberType {
  name: string
  value: boolean
  initialValue: number
  currentValue: number
  targetValue: number
  constructor(name: string, value: boolean, initialValue: number, currentValue: number, targetValue: number) {
    this.name = name
    this.value = value
    this.initialValue = initialValue
    this.currentValue = currentValue
    this.targetValue = targetValue
  }
}