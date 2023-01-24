import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import '../App.css'
import { ITask, TODO_TYPE } from '../types';
import { ModalComponent } from '../components/ModalComponent';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { randomIdGenerator } from '../utils';
import { useParams } from 'react-router-dom';

const DisplayTaskList: React.FC<{taskList: ITask[]}> = ({taskList}) => {
    return (
        <div className="list-group">
            {taskList.map(item => (
                <a href={item.id} className="list-group-item list-group-item-action flex-column align-items-start">
                    <p className="mb-1">{item.name}</p>
                </a>
             ))}
        </div>
    )
}


export const GoalPage: React.FC = (id) => {
    const params = useParams()
    const [tasks, setTasks] = useState<ITask[]>([{name: "Demo Task Name", id: randomIdGenerator(), goalId: randomIdGenerator(), type: TODO_TYPE, value: []}, {name: "New Task Name", id: randomIdGenerator(), goalId: randomIdGenerator(), type: TODO_TYPE, value: []}]);
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



