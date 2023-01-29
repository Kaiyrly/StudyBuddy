import React, { FormEvent, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css'
import { fakeAuth } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: React.FC<{token: string | undefined, setToken: (userToken: {token: string | undefined}) => void}> = ({token, setToken}) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!email || !password)
      return
    const token = await fakeAuth(email, password)
    setToken({token})
    navigate(location.state?.from?.pathname || "/", { replace: true })
  }

  return (
    <div className='login-form'>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
    </Form>
    </div>
  )
}
