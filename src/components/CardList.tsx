import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import '../App.css'
import { IGoal } from '../types';

export const CardList = (goals: IGoal[]) => {
    const navigate = useNavigate()

    const goToGoal = (goalId: String) => {
        navigate("/goals/" + goalId)
    }

    const displayCards = goals.map(( goal ) => {
        return (
            // TODO: move this into its own component
            <Card key={goal.id} style={{ width: '18rem' }}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <img src={require("../imgs/" + goal.imgUrl)}/>
                        <Card.Body>
                        <Card.Title>{goal.name}</Card.Title>
                        <Card.Text>
                            Some description for the goal which is not ready
                        </Card.Text>
                        <Button variant="primary" onClick={() => goToGoal(goal.id)}>
                                Go to Goal
                        </Button>
                        </Card.Body>
            </Card>
        )
    })
    return (
        displayCards
    )
}
