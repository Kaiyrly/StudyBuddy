import React, { useState } from 'react'
import { ITask } from '../types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { randomIdGenerator } from '../utils';

export const CreateTaskForm: React.FC<{createHandler?: (goal: ITask) => void}> = ({createHandler}) => {
  const [task, setTask] = useState<ITask>({name: "", id: randomIdGenerator(), goalId: randomIdGenerator()})
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createHandler?.(task)
  }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name of the goal</Form.Label>
        <Form.Control type="text" placeholder="Apply to OnSquare" onChange={(e) => {setTask({...task, name: e.target.value})}}/>
      </Form.Group>
      <Button type='submit'>Create!</Button>
    </Form>
  )
}
