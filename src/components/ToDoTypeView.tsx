import React, { useState } from 'react'
import { ListGroup, ToggleButton } from 'react-bootstrap';
import { IToDo } from '../types'

const SingleToDo: React.FC<{todoItem: IToDo, index: number}> = ({todoItem, index}) => {
  const [todo, setTodo] = useState<IToDo>(todoItem)

  return (
    <ListGroup.Item onClick = {() => setTodo({...todo, value: !todo.value})} key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      {String(index + 1) + '. ' + todo.name}
      <ToggleButton
        variant={todo.value ? 'outline-success' : 'outline-primary'}
        value={1}
        size="sm"
        style={{marginRight: 0}}
      >
        {todo.value ? 'Done' : 'In process'}
      </ToggleButton>
    </ListGroup.Item>
  )
}

const ToDoTypeView: React.FC<{todos: IToDo[]}> = ({todos}) => {
  return (
    <ListGroup defaultActiveKey="#link1">
      {todos.map((todoItem, index) => SingleToDo({todoItem, index}))}
    </ListGroup>
  )
}

export default ToDoTypeView