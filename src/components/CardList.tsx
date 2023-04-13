import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { IGoal } from '../types';

interface CardListProps {
  goals: IGoal[];
}

export const CardList: React.FC<CardListProps> = ({ goals }) => {
  const navigate = useNavigate();

  const goToGoal = (goalId: String, goalName: String) => {
    navigate('/goals/' + goalId, { state: { goalName } });
  };

  const displayCards = goals.map((goal) => {
    return (
      // TODO: move this into its own component
      <Card key={goal.goalId} style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <img src={require('../imgs/' + goal.imgUrl)} />
        <Card.Body>
          <Card.Title>{goal.name}</Card.Title>
          <Card.Text>Some description for the goal which is not ready</Card.Text>
          <Button variant="primary" onClick={() => goToGoal(goal.goalId, goal.name)}>
            Go to Goal
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return <>{displayCards}</>;
};
