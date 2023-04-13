import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ITask, IToDoList, INumberType, IToDo } from '../types';
import { ModalComponent } from './ModalComponent';
import ToDoTypeView from './ToDoTypeView';
import { NumberTypeView } from './NumberTypeView';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


interface TaskModalProps {
  item: ITask;
  onUpdateTask: (updatedTask: ITask) => Promise<void>;
}

export const TaskModal: React.FC<TaskModalProps> = ({ item, onUpdateTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = async (updatedItem: ITask) => {
    if (updatedItem) {
      await onUpdateTask(updatedItem);
    }
    setShowModal(false);
  };

  const handleCloseForNumberType = (currentCount: number, goalCount: number) => {
    if (isNumberType(item.value)) {
      const taskComplete = currentCount >= goalCount;
      handleModalClose({
        ...item,
        value: new INumberType(item.value.name, taskComplete, item.value.initialValue, currentCount, goalCount),
        taskComplete: taskComplete,
      });
    }
  };

  const handleCloseForToDoType = (todoList: IToDoList, todos: IToDo[]) => {
    const allTodosCompleted = todos.every(todo => todo.value === true);
    if (isToDoList(item.value)) {
      handleModalClose({
        ...item,
        value: new IToDoList(todos),
        taskComplete: allTodosCompleted,
      });
    }
  };

  

  const isToDoList = (value: IToDoList | INumberType): value is IToDoList => {
    return value instanceof IToDoList;
  };

  const isNumberType = (value: IToDoList | INumberType): value is INumberType => {
    return value instanceof INumberType;
  };

  const calculateCompletionPercentage = (task: ITask): number => {
    if (isNumberType(task.value)) {
      const progress = (task.value.currentValue / task.value.targetValue) * 100;
      return progress > 100 ? 100 : progress;
    } else if (isToDoList(task.value)) {
      const completedTodos = task.value.value.filter((todo) => todo.value === true);
      return (completedTodos.length / task.value.value.length) * 100;
    }
    return 0;
  };

  const completionPercentage = calculateCompletionPercentage(item);

  if (isToDoList(item.value)) {
    return (
      <>
        {showModal && (
            <ModalComponent
              setShowModal={setShowModal}
              title={item.name}
              onClose={handleModalClose}
              onSave={() => handleModalClose(item)}
            >
            <ToDoTypeView item={item} taskId={item.taskId} onClose={handleCloseForToDoType}/>
                      
            </ModalComponent>

        )}
    
        <a
          className="list-group-item list-group-item-action align-items-start"
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="mb-1">{item.name}</p>
            <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
              Show task
            </Button>
          </div>
          <div style={{ width: '60px', height: '60px', marginBottom: '10px' }}>
            <CircularProgressbar value={completionPercentage} text={`${Math.round(completionPercentage)}%`} />
          </div>
        </a>
      </>
    );
  }
  
  
  
  
  
  
  if (isNumberType(item.value)) {
    return (
      <>
        {showModal && (
            <ModalComponent
              setShowModal={setShowModal}
              title={item.name}
              onClose={handleModalClose}
              onSave={() => handleModalClose(item)}
            >
            <NumberTypeView number={item.value} onClose={handleCloseForNumberType}/>          
            </ModalComponent>
        )}
        <a
          className="list-group-item list-group-item-action align-items-start"
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="mb-1">{item.name}</p>
            <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
              Show task
            </Button>
          </div>
          <div style={{ width: '60px', height: '60px', marginBottom: '10px' }}>
            <CircularProgressbar value={completionPercentage} text={`${Math.round(completionPercentage)}%`} />
          </div>
          
        </a>
      </>
    );
  }
  return <>default view</>;
};
