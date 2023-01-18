import React, { useState } from 'react'
import { Goal } from '../types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const CreateGoalForm: React.FC = () => {
  const [goal, setGoal] = useState<Goal>({name: "", id: 123})
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(goal)
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
