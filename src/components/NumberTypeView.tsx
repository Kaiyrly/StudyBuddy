import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { ITask, INumberType, IToDoList } from "../types";
import Modal from 'react-bootstrap/Modal';



interface NumberTypeViewProps {
  number: INumberType;
  onClose: (currentCount: number, goalCount: number) => void;
}


export const NumberTypeView: React.FC<NumberTypeViewProps> = ({
  number,
  onClose,
}) => {
  const [currentCount, setCurrentCount] = useState(number.currentValue);
  const [goalCount, setGoalCount] = useState(number.targetValue);

    const incrementCurrentCount = () => {
      setCurrentCount((count: number) => count + 1);
    };

    const decrementCurrentCount = () => {
      setCurrentCount((count: number) => count - 1);
    };

    const resetCurrentCount = () => {
      setCurrentCount(0);
    };

    const incrementGoalCount = () => {
      setGoalCount(goalCount + 1);
    };

    const decrementGoalCount = () => {
      setGoalCount(goalCount - 1);
    };

    const resetGoalCount = () => {
      setGoalCount(0);
    };

    return (
      <div className="app">
        <p>Count: {currentCount}</p>
        <div className="buttons">
          <Button variant="primary" onClick={decrementCurrentCount}>Decrement</Button>{' '}
          <Button variant="primary" onClick={incrementCurrentCount}>Increment</Button>{' '}
          <Button variant="primary" onClick={resetCurrentCount}>Reset</Button>{' '}
        </div>
        <p>Count: {goalCount}</p>
        <div className="buttons">
          <Button variant="primary" onClick={decrementGoalCount}>Decrement</Button>{' '}
          <Button variant="primary" onClick={incrementGoalCount}>Increment</Button>{' '}
          <Button variant="primary" onClick={resetGoalCount}>Reset</Button>{' '}
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose(currentCount, goalCount)}>
            Close
          </Button>
        </Modal.Footer>
      </div>
    );
};
