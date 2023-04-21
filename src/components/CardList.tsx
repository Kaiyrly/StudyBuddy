import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { IGoal } from '../types';

interface CardListProps {
  goals: IGoal[];
  onDeleteGoal: (goalId: string) => Promise<void>;
  onUpdateGoal: (goalId: string, goalAchieved: boolean) => Promise<void>;
  searchQuery: string;
}

export const CardList: React.FC<CardListProps> = ({ goals, onDeleteGoal, onUpdateGoal, searchQuery }) => {
  const navigate = useNavigate();

  const goToGoal = (goalId: String, goalName: String) => {
    navigate('/goals/' + goalId, { state: { goalName } });
  };

  const handleDeleteGoal = async (goalId: string) => {
    await onDeleteGoal(goalId);
  };


  const handleGoalAchievedChange = async (goalId: string, goalAchieved: boolean) => {
    await onUpdateGoal(goalId, goalAchieved);
  };

  const filteredGoals = goals.filter((goal) =>
    goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    goal.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const displayCards = filteredGoals.map((goal) => {
    return (
      // TODO: move this into its own component
      <Card key={goal.goalId} style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        {/* <img src={require('../imgs/' + goal.imgUrl)} /> */}
        <Card.Body>
          <Card.Title>{goal.name}</Card.Title>
          {/* Replace Card.Text with a component to display tags */}
          <div>
            {goal.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <Button variant="primary" onClick={() => goToGoal(goal.goalId, goal.name)}>
            Go to Goal
          </Button>
        </Card.Body>
        <Card.Footer>
          <input
            type="checkbox"
            id={`goalAchievedCheckbox-${goal.goalId}`}
            checked={goal.goalAchieved}
            onChange={(e) => handleGoalAchievedChange(goal.goalId, e.target.checked)}
          />
          <label htmlFor={`goalAchievedCheckbox-${goal.goalId}`}>Goal Achieved</label>
          <Button variant="danger" onClick={() => handleDeleteGoal(goal.goalId)}>
            Delete Goal
          </Button>
        </Card.Footer>
      </Card>
    );
  });

  return <>{displayCards}</>;
};


