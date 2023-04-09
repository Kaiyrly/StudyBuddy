import axios from 'axios';
import { IGoal, ITask } from '../types';


const API_URL = 'http://localhost:5001/api';

export const getGoals = async () => {
  const response = await axios.get(`${API_URL}/goals`);
  return response.data;
};

export const createGoal = async (goal: IGoal) => {
  const response = await axios.post(`${API_URL}/goals`, goal);
  return response.data;
};

export const updateGoal = async (goalId: string, goal: IGoal) => {
  const response = await axios.put(`${API_URL}/goals/${goalId}`, goal);
  return response.data;
};

export const updateTask = async (task: ITask) => {
  const response = await axios.put(`${API_URL}/tasks/${task.taskId}`, task);
  return response.data;
};

// Add more functions for different API calls
