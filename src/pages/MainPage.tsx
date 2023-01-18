import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { CardList } from '../components/CardList';
import '../App.css'
import { ModalComponent } from '../components/ModalComponent';
import { CreateGoalForm } from '../components/CreateGoalForm';

export const MainPage: React.FC = () => {
    const [goals, setGoals] = useState<string[]>(["wiojeoijsdf", "slkdjflksdj"]);
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {showModal && 
                <ModalComponent setShowModal={setShowModal}>
                    <CreateGoalForm />
                </ModalComponent>
            }
            <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>Create new goal</Button>{' '}
            {CardList(goals)}
        </>
      )
}
