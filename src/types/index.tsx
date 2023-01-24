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
  value: IToDo[] | INumberType
  goalId: string
  id: string
}

export interface IToDo {
  type: string // = NUMBER_TYPE | TODO_TYPE | BOOLEAN_TYPE
  name: string
  value: boolean
}

export interface INumberType {
  type: string // = NUMBER_TYPE | TODO_TYPE | BOOLEAN_TYPE
  name: string
  value: boolean
  initialValue: number
  currentValue: number
  targetValue: number
}