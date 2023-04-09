import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ITask, INumberType, IToDoList, IToDo } from '../types';
import { ModalComponent } from '../components/ModalComponent';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { DisplayTaskList } from '../components/DisplayTaskList';
import { updateTask } from '../services/api';

export const GoalPage: React.FC = () => {
    const params = useParams();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [showModal, setShowModal] = useState(false);

    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/tasks?goalId=${params.id}`);
        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }
        const fetchedTasks = await response.json();
        const derivedTasks: ITask[] = [];
    
        for (let i = 0; i < fetchedTasks.length; i++) {
          const task = fetchedTasks[i];
          const derivedTask: ITask = {
            name: task.name,
            taskId: task.taskId,
            goalId: task.goalId,
            value: task.value,
            taskComplete: task.taskComplete,
            taskType: task.taskType,
          };
    
          if (task.taskType === 'NumberType') {
            derivedTask.value = new INumberType(task.name, task.taskComplete, task.value.initialValue, task.value.currentValue, task.value.targetValue);
          }
          if (task.taskType === 'ToDoList') {
            const toDoList: IToDo[] = task.value;
            derivedTask.value = new IToDoList(toDoList);
          }
    
          derivedTasks.push(derivedTask);
        }
    
        setTasks(derivedTasks);
      } catch (error) {
        console.error(`Error fetching tasks: ${error}`);
      }
    };
  useEffect(() => {
    fetchTasks();
  }, [params.id]);

  const newTask = (task: ITask) => {
    setTasks((oldTasks) => [...oldTasks, task]);
    setShowModal(false);
  };

  const createTask = async (taskData: any) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/tasks`, taskData);
      const newTaskData = response.data.newTask;
      newTask(newTaskData);
    } catch (error) {
      console.error(`Error creating task: ${error}`);
    }
  };


  const updateTaskInDatabase = async (updatedTask: ITask) => {
    updatedTask.goalId = params.id ?? '';
    try {
      await updateTask(updatedTask);
      setTasks((oldTasks) =>
        oldTasks.map((task) => (task.taskId === updatedTask.taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error(`Error updating task in database: ${error}`);
    }
  };
  
  const handleModalClose = () => {
    // This can be left empty or you can add any logic needed when the modal is closed.
  };


  return (
    <>
      {showModal && (
        <ModalComponent setShowModal={setShowModal} title="Create Task" onClose={handleModalClose}>
          <CreateTaskForm createHandler={createTask} goalId={params.id ?? ''} />
        </ModalComponent>
      
      )}
       <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
        Create new task
      </Button>{' '}
      <p>This goal's id is {params.id}</p>
      <DisplayTaskList taskList={tasks} onUpdateTask={updateTaskInDatabase} />
    </>
  );
};





