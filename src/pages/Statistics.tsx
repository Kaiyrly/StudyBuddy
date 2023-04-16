import React, { useState, useEffect, useCallback } from 'react';
import { MDBContainer } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import { fetchCompletedTasks } from '../services/api';
import { ITask } from '../types';
import 'chart.js/auto';
import '../App.css';

export const Statistics: React.FC = () => {
  const [currentView, setCurrentView] = useState("week");
  const [topText, setTopText] = useState("");

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
  const annualLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const [weeklyChartData, setWeeklyChartData] = useState(formatChartData(weeklyLabels, weeklyData));
  const [monthlyChartData, setMonthlyChartData] = useState(formatChartData(monthlyLabels, monthlyData));
  const [annualChartData, setAnnualChartData] = useState(formatChartData(annualLabels, annualData));

  const [currentDate, setCurrentDate] = useState(new Date());

  const [completedTasks, setCompletedTasks] = useState([]);

  const [data, setData] = useState(formatChartData(weeklyLabels, weeklyData));

  const getWeekStartEnd = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); // Sets the start to Monday
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Sets the end to Sunday
    return { start, end };
  };
  
  const getMonthStartEnd = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { start, end };
  };
  
  const getYearStartEnd = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const end = new Date(date.getFullYear(), 11, 31);
    return { start, end };
  };

  const updateTopText = () => {

    const currentWeek = getWeekStartEnd(currentDate);
    const currentMonth = getMonthStartEnd(currentDate);
    const currentYear = getYearStartEnd(currentDate);


    if(currentView === "week") {
      const newText = annualLabels[currentWeek.start.getMonth()] + '.' + currentWeek.start.getDate() + '-' + annualLabels[currentWeek.end.getMonth()] + '.' + currentWeek.end.getDate();
      setTopText(newText);
    }
    if(currentView === "month") setTopText(annualLabels[currentMonth.start.getMonth()]);
    
    if(currentView === "year") setTopText(currentYear.start.getFullYear().toString());

  }

  const processCompletedTasksData = (completedTasks: ITask[]) => {
    updateTopText();

    weeklyData.fill(0);
    monthlyData.fill(0);
    annualData.fill(0);
  
    const currentWeek = getWeekStartEnd(currentDate);
    const currentMonth = getMonthStartEnd(currentDate);
    const currentYear = getYearStartEnd(currentDate);

  
    completedTasks.forEach((task: ITask) => {
      const completionDate = task.completionDate;
      if (!completionDate) return;
  
      const date = new Date(completionDate);
  
      if (date >= currentWeek.start && date <= currentWeek.end) {
        console.log(date, currentWeek)
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
    setCurrentView("week");
  };
  const setMonthly = () => {
    setData(monthlyChartData);
    setCurrentView("month");
  };
  const setAnnual = () => {
    setData(annualChartData);
    setCurrentView("year");
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    processCompletedTasksData(completedTasks);
  }, [completedTasks, currentView]);
  


  const previousPeriod = () => {
    let newDate;
    switch (currentView) {
      case "week":
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
        processCompletedTasksData(completedTasks);
        break;
      case "month":
        newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
        processCompletedTasksData(completedTasks);
        break;
      // case "year":
      //   newDate = new Date(currentYear.start);
      //   newDate.setFullYear(newDate.getFullYear() - 1);
      //   setCurrentYear({ start: new Date(newDate.getFullYear(), 0, 1), end: new Date(newDate.getFullYear(), 11, 31) });
        // processCompletedTasksData(completedTasks);
      //   break;
    }
  };

  const nextPeriod = () => {
    let newDate;
    switch (currentView) {
      case "week":
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
        processCompletedTasksData(completedTasks);
        break;
      case "month":
        newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
        processCompletedTasksData(completedTasks);
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
      <p>{topText}</p>
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
         

