import axios from 'axios';
import { IGoal, ITask } from '../types';


const API_URL = 'http://localhost:5000/api';

export const getGoals = async () => {
  const response = await axios.get(`${API_URL}/goals`);
  return response.data;
};

export const createGoal = async (goal: IGoal) => {
  const response = await axios.post(`${API_URL}/goals`, goal);
  return response.data;
};

export const updateGoal = async (id: string, goal: IGoal) => {
  const response = await axios.put(`${API_URL}/goals/${id}`, goal);
  return response.data;
};

export const updateTask = async (task: ITask) => {
  const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
  return response.data;
};

// Add more functions for different API calls
