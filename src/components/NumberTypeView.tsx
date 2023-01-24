import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { INumberType } from '../types'

export const NumberTypeView: React.FC<{number: INumberType}> = ({number}) => {
  const [currentCount, setCurrentCount] = useState(number.currentValue);
  const [goalCount, setGoalCount] = useState(number.targetValue);

  let incrementCurrentCount = () => {
    setCurrentCount(currentCount + 1);
  };

  let decrementCurrentCount = () => {
    setCurrentCount(currentCount - 1);
  };

  let resetCurrentCount = () => {
    setCurrentCount(0);
  }
  let incrementGoalCount = () => {
    setGoalCount(goalCount + 1);
  };

  let decrementGoalCount = () => {
    setGoalCount(goalCount - 1);
  };

  let resetGoalCount = () => {
    setGoalCount(0);
  }
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
  </div>
  );
  }

