import React, { useState } from 'react'
import { IGoal } from '../types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { randomIdGenerator } from '../utils';

export const CreateGoalForm: React.FC<{createHandler?: (goal: IGoal) => void}> = ({createHandler}) => {
  const [goal, setGoal] = useState<IGoal>({name: "", id: randomIdGenerator(), tasks: []})
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createHandler?.(goal)
  }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name of the goal</Form.Label>
        <Form.Control type="text" placeholder="Apply to OnSquare" onChange={(e) => {setGoal({...goal, name: e.target.value})}}/>
      </Form.Group>
      <Button type='submit'>Create!</Button>
    </Form>
  )
}
