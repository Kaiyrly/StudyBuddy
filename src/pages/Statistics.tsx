import React, { useState, useEffect, useCallback } from 'react';
import { MDBContainer } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import { fetchCompletedTasks } from '../services/api';
import { ITask } from '../types';
import 'chart.js/auto';
import '../App.css';

export const Statistics: React.FC = () => {
  const formatChartData = (labels: any[], data: number[]) => {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Tasks finished',
          data: data,
          backgroundColor: '#02b844',
          borderWidth: 1,
          borderColor: '#000000',
        },
      ],
    };
  };

  let weeklyData = Array(7).fill(0);
  let monthlyData = Array(31).fill(0);
  let annualData = Array(12).fill(0);

  const weeklyLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const monthlyLabels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const annualLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  const [weeklyChartData, setWeeklyChartData] = useState(formatChartData(weeklyLabels, weeklyData));
  const [monthlyChartData, setMonthlyChartData] = useState(formatChartData(monthlyLabels, monthlyData));
  const [annualChartData, setAnnualChartData] = useState(formatChartData(annualLabels, annualData));

  const [currentWeek, setCurrentWeek] = useState({ start: new Date(), end: new Date() });
  const [currentMonth, setCurrentMonth] = useState({ start: new Date(), end: new Date() });
  const [currentYear, setCurrentYear] = useState({ start: new Date(), end: new Date() });

  const [completedTasks, setCompletedTasks] = useState([]);

  const [data, setData] = useState(formatChartData(weeklyLabels, weeklyData));

  const processCompletedTasksData = (completedTasks: ITask[]) => {
    console.log(currentWeek)
    weeklyData.fill(0);
    monthlyData.fill(0);
    annualData.fill(0);
  
    completedTasks.forEach((task: ITask) => {
      const completionDate = task.completionDate;
      if (!completionDate) return;
  
      const date = new Date(completionDate);
  
      if (date >= currentWeek.start && date <= currentWeek.end) {
        const weekDay = date.getDay();
        const weekKey = weekDay === 0 ? 6 : weekDay - 1;
        weeklyData[weekKey] += 1;
      }
  
      if (date >= currentMonth.start && date <= currentMonth.end) {
        const day = date.getDate();
        const monthKey = day - 1;
        monthlyData[monthKey] += 1;
      }
  
      if (date >= currentYear.start && date <= currentYear.end) {
        const month = date.getMonth();
        const yearKey = month;
        annualData[yearKey] += 1;
      }
    });
  
    setWeeklyChartData(formatChartData(weeklyLabels, weeklyData));
    setMonthlyChartData(formatChartData(monthlyLabels, monthlyData));
    setAnnualChartData(formatChartData(annualLabels, annualData));
  };
  

  const fetchData = async () => {
    const completeTasks = await fetchCompletedTasks();
    setCompletedTasks(completeTasks);
  };

  const setWeekly = () => {
    setData(weeklyChartData);
  };
  const setMonthly = () => {
    setData(monthlyChartData);
  };
  const setAnnual = () => {
    setData(annualChartData);
  };

  useEffect(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() - now.getDay() + 7);
  
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
  
    setCurrentWeek({ start: startOfWeek, end: endOfWeek });
    setCurrentMonth({ start: startOfMonth, end: endOfMonth });
    setCurrentYear({ start: startOfYear, end: endOfYear });
  
    fetchData();
  }, []);
  
  useEffect(() => {
    processCompletedTasksData(completedTasks);
  }, [completedTasks]);
  


  const previousPeriod = () => {
    let newDate;
    switch (data) {
      case weeklyChartData:
        newDate = new Date(currentWeek.start);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeek({ start: newDate, end: new Date(newDate.setDate(newDate.getDate() + 6)) });
        processCompletedTasksData(completedTasks);
        break;
      case monthlyChartData:
        newDate = new Date(currentMonth.start);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentMonth({ start: new Date(newDate.getFullYear(), newDate.getMonth(), 1), end: new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0) });
        processCompletedTasksData(completedTasks);
        break;
      // case annualChartData:
      //   newDate = new Date(currentYear.start);
      //   newDate.setFullYear(newDate.getFullYear() - 1);
      //   setCurrentYear({ start: new Date(newDate.getFullYear(), 0, 1), end: new Date(newDate.getFullYear(), 11, 31) });
        // processCompletedTasksData(completedTasks);
      //   break;
    }
  };

  const nextPeriod = () => {
    let newDate;
    switch (data) {
      case weeklyChartData:
        newDate = new Date(currentWeek.start);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeek({ start: newDate, end: new Date(newDate.setDate(newDate.getDate() + 6)) });
        break;
      case monthlyChartData:
        newDate = new Date(currentMonth.start);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentMonth({ start: new Date(newDate.getFullYear(), newDate.getMonth(), 1), end: new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0) });
        break;
      // case annualChartData:
      //   newDate = new Date(currentYear.start);
      //   newDate.setFullYear(newDate.getFullYear() + 1);
      //   setCurrentYear({ start: new Date(newDate.getFullYear(), 0, 1), end: new Date(newDate.getFullYear(), 11, 31) });
      //   break;
    }
  };

  return (
    <>
      <MDBContainer>
        <Bar data={data} style={{ maxHeight: '600px' }} />
      </MDBContainer>
      <div>
        <Button size="sm" onClick={previousPeriod}>
          &lt;
        </Button>
        <Button size="sm" onClick={() => setWeekly()}>
          W
        </Button>
        <Button size="sm" onClick={() => setMonthly()}>
          M
        </Button>
        <Button size="sm" onClick={() => setAnnual()}>
          Y
        </Button>
        <Button size="sm" onClick={nextPeriod}>
          &gt;
        </Button>
      </div>
    </>
  );
};

export default Statistics;
         

