import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { CardList } from '../components/CardList';
import { NavBar } from '../components/NavBar';
import '../App.css'

export const MainPage: React.FC = () => {
    const [goals, setGoals] = useState<string[]>(["wiojeoijsdf", "slkdjflksdj"]);

    const newGoal = () => {
        setGoals(oldList => [...oldList, "gooaallallal"])
        console.log(goals)
    }

    return (
        <>
            <Button variant="primary" size="lg" onClick={newGoal}>
                Add a goal
            </Button>{' '}
            {CardList(goals)}
        </>
      )
}
