import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ITask, IToDoList, INumberType, IToDo } from '../types';
import { ModalComponent } from './ModalComponent';
import ToDoTypeView from './ToDoTypeView';
import { NumberTypeView } from './NumberTypeView';

interface TaskModalProps {
  item: ITask;
  onUpdateTask: (updatedTask: ITask) => Promise<void>;
}

export const TaskModal: React.FC<TaskModalProps> = ({ item, onUpdateTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = async (updatedItem: ITask) => {
    console.log(updatedItem)
    if (updatedItem) {
      await onUpdateTask(updatedItem);
    }
    setShowModal(false);
  };

  const handleCloseForNumberType = (currentCount: number, goalCount: number) => {
    if (isNumberType(item.value)) {
      handleModalClose({
        ...item,
        value: new INumberType(item.value.name, item.value.value, item.value.initialValue, currentCount, goalCount),
      });
    }
  };

  const handleCloseForToDoType = (todoList: IToDoList, todos: IToDo[]) => {
    console.log(todoList, todos);
    if (isToDoList(item.value)) {
      handleModalClose({
        ...item,
        value: new IToDoList(todos),
      });
    }
  };

  

  const isToDoList = (value: IToDoList | INumberType): value is IToDoList => {
    return value instanceof IToDoList;
  };

  const isNumberType = (value: IToDoList | INumberType): value is INumberType => {
    return value instanceof INumberType;
  };

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
  
        <a className="list-group-item list-group-item-action flex-column align-items-start">
          <p className="mb-1">{item.name}</p>
          <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
            Show task
          </Button>{' '}
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
          >
            <NumberTypeView number={item.value} onClose={handleCloseForNumberType} />
          </ModalComponent>
        )}
        <a className="list-group-item list-group-item-action flex-column align-items-start">
          <p className="mb-1">{item.name}</p>
          <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
            Show task
          </Button>{' '}
        </a>
      </>
    );
  }
  return <>default view</>;
};
