import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import '../App.css'
import { INumberType, ITask, IToDoList, NUMBER_TYPE, TODO_TYPE } from '../types';
import { ModalComponent } from '../components/ModalComponent';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { NumberTypeView } from '../components/NumberTypeView';
import ToDoTypeView from '../components/ToDoTypeView';
import { randomIdGenerator } from '../utils';
import { useParams } from 'react-router-dom';
import { NumberTypeSample, ToDoListSample } from '../samples';

const TaskModal: React.FC<{item: ITask}> = ({item}) => {
    const [showModal, setShowModal] = useState(false)

    if(item.value instanceof IToDoList){
        return (
            <>
                {showModal && <ModalComponent setShowModal={setShowModal}>
                    <ToDoTypeView todos={item.value.value}/>
                </ModalComponent>}
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                    <p className="mb-1">{item.name}</p>
                    <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>Show task</Button>{' '}
                </a>
            </>
        )
    }
    if(item.value instanceof INumberType){
        return (
            <>
                {showModal && <ModalComponent setShowModal={setShowModal}>
                    <NumberTypeView number={item.value}/>
                </ModalComponent>}
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                    <p className="mb-1">{item.name}</p>
                    <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>Show task</Button>{' '}
                </a>
            </>
        )
    }
    return <>default view</>;
}

const DisplayTaskList: React.FC<{taskList: ITask[]}> = ({taskList}) => {
    return (
        <div className="list-group">
            {taskList.map((item, i) => (
                <div key={i}>
                    <TaskModal item={item}/>
                </div>
             ))}
        </div>
    )
}


export const GoalPage: React.FC = (id) => {
    const params = useParams()
    const [tasks, setTasks] = useState<ITask[]>([
        {name: "Demo Task Name", id: randomIdGenerator(), goalId: randomIdGenerator(), value: NumberTypeSample},
        {name: "New Task Name", id: randomIdGenerator(), goalId: randomIdGenerator(), value: ToDoListSample}
    ]);
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



