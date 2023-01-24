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
  type: string // = NUMBER_TYPE | TODO_TYPE | BOOLEAN_TYPE
  value: IToDoList | INumberType
  goalId: string
  id: string
}

export interface IToDoList {
  type: string
  value: IToDo[]
}

export interface IToDo {
  name: string
  value: boolean
}

export interface INumberType {
  type: string
  name: string
  value: boolean
  initialValue: number
  currentValue: number
  targetValue: number
}