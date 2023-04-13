import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { CardList } from '../components/CardList';
import '../App.css'
import { ModalComponent } from '../components/ModalComponent';
import { CreateGoalForm } from '../components/CreateGoalForm';
import { IGoal } from '../types';
import { randomIdGenerator } from '../utils';
import { getGoals, createGoal, updateGoal } from '../services/api'
import { getUserIdFromToken } from '../helpers/index'
import useToken from '../hooks/useToken';


export const MainPage: React.FC = () => {
    const [goals, setGoals] = useState<IGoal[]>([]);
    const [showModal, setShowModal] = useState(false)
    const { token } = useToken();
    const userId = getUserIdFromToken(token ?? '') ?? '';

    useEffect(() => {
        fetchGoals();
      }, []);

    const createNewGoal = (goal: IGoal) => {
        setGoals([...goals, goal])
        handleCreation(goal)
        setShowModal(false)
    }

    const handleCreation = async (newGoal: IGoal) => {
        try {
            const createdGoal = await createGoal(newGoal, userId);
            console.log(newGoal);
          } catch (error) {
            console.error('Error creating goal:', error);
        }
    }



    const fetchGoals = async () => {
        try {
          const fetchedGoals = await getGoals(userId);
          setGoals(fetchedGoals);
        } catch (error) {
          console.error('Error fetching goals:', error);
        }
      };
      
      const handleModalClose = () => {
        // This can be left empty or you can add any logic needed when the modal is closed.
      };
    
      

      return (
        <>
          {showModal && (
            <ModalComponent setShowModal={setShowModal} title="Create Goal" onClose={handleModalClose}>
              <CreateGoalForm createHandler={createNewGoal} />
            </ModalComponent>
          
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowModal(true)}
            style={{ margin: '1rem 0' }}
          >
            Create new goal
          </Button>
          {' '}
          <CardList goals={goals} />
        </>
      );
}
