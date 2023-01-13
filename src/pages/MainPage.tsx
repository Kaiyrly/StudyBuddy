import React, { MouseEventHandler, ReactNode, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'
import { getOriginalNode } from 'typescript';

export const MainPage: React.FC = () => {
    const [goals, setGoals] = useState<string[]>(["wiojeoijsdf", "slkdjflksdj"]);

    const newGoal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setGoals(oldList => [...oldList, "gooaallallal"])
        console.log(goals)
    }

    const displayGoals = goals.map((goal) => {
        return (
            // TODO: move this into its own component
            <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Title>{goal}</Card.Title>
                        <Card.Text>
                            Some description for the goal which is not ready
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
            </Card>
        )
    })

    return (
        <>
            // TODO: move navbar into its own component, so that it will be reusable
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="/main">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/main">Main</Nav.Link>
                    <Nav.Link href="/statistics">Statistics</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <Button variant="primary" size="lg" onClick={newGoal}>
                Add a goal
            </Button>{' '}
            {displayGoals}
        </>
      )
}
