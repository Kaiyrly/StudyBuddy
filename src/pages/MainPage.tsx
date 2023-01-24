import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { CardList } from '../components/CardList';
import '../App.css'
import { ModalComponent } from '../components/ModalComponent';
import { CreateGoalForm } from '../components/CreateGoalForm';
import { IGoal } from '../types';
import { randomIdGenerator } from '../utils';

export const MainPage: React.FC = () => {
    const [goals, setGoals] = useState<IGoal[]>([{name: "Demo Goal Name", id: randomIdGenerator(), tasks: []}]);
    const [showModal, setShowModal] = useState(false)

    const createGoal = (goal: IGoal) => {
        setGoals([...goals, goal])
        setShowModal(false)
    }

    return (
        <>
            {showModal && 
                <ModalComponent setShowModal={setShowModal}>
                    <CreateGoalForm createHandler={createGoal} />
                </ModalComponent>
            }
            <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>Create new goal</Button>{' '}
            {CardList(goals)}
        </>
      )
}
