import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import '../App.css'
import { ITask } from '../types';
import { ModalComponent } from '../components/ModalComponent';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { randomIdGenerator } from '../utils';
import { useParams } from 'react-router-dom';

const DisplayTaskList: React.FC<{taskList: ITask[]}> = ({taskList}) => {
    return (
        <ul>
        {taskList.map(item => (
            <li key={item.id}>{item.name}</li>
        ))}
        </ul>
    )
}


export const GoalPage: React.FC = (id) => {
    const params = useParams()
    const [tasks, setTasks] = useState<ITask[]>([{name: "Demo Task Name", id: randomIdGenerator(), goalId: randomIdGenerator()}, {name: "New Task Name", id: randomIdGenerator(), goalId: randomIdGenerator()}]);
    const [showModal, setShowModal] = useState(false)

    const newTask = (task: ITask) => {
        setTasks([...tasks, task])
        setShowModal(false)
    }

    return (
        <>
            {showModal && 
                <ModalComponent setShowModal={setShowModal}>
                    <CreateTaskForm createHandler={newTask} />
                </ModalComponent>
            }
            <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>Create new goal</Button>{' '}
            <p>This goal's id is {params.id}</p>
            <DisplayTaskList taskList={tasks}/>
        </>
      )
}



