import React, { useState, useEffect } from 'react'
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import Button from 'react-bootstrap/Button';
import { fetchCompletedTasks } from '../services/api';
import { ITask } from '../types';
import "chart.js/auto";
import '../App.css'

export const Statistics: React.FC = () => {
  const formatChartData = (labels: any[], data: number[]) => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Tasks finished",
          data: data,
          backgroundColor: "#02b844",
          borderWidth: 1,
          borderColor: "#000000",
        },
      ],
    };
  };


  let dailyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let weeklyData= [0, 0, 0, 0, 0, 0, 0];
  let monthlyData= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let annualData= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const dailyLabels = ["00-01", "01-02", "02-03", "03-04", "04-05", "05-06", "06-07", "07-08", "08-09", "09-10", "10-11", 
  "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20", "20-21", 
  "21-22", "22-23", "23-24"];
  const weeklyLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const monthlyLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"
  , "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  const annualLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]

  const [dailyChartData, setDailyChartData] = useState(formatChartData(dailyLabels, dailyData));
  const [weeklyChartData, setWeeklyChartData] = useState(formatChartData(weeklyLabels, weeklyData));
  const [monthlyChartData, setMonthlyChartData] = useState(formatChartData(monthlyLabels, monthlyData));
  const [annualChartData, setAnnualChartData] = useState(formatChartData(annualLabels, annualData));


  const [data, setData] = useState(formatChartData(dailyLabels, dailyData));

    const processCompletedTasksData = (completedTasks: []) => {
      const formatDate = (date: Date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}-${String(d.getHours()).padStart(2, "0")}`;
      };
    
    
    
      // Process the completed tasks
      completedTasks.forEach((task: ITask) => {
        const completionDate = task.completionDate
        const date = formatDate(completionDate ?? new Date());
        const [yearStr, monthStr, dayStr, hourStr] = date.split("-");

        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);
        const hour = parseInt(hourStr);

        const hourKey = hour - 1;
          
        dailyData[hourKey] = (dailyData[hourKey] || 0) + 1;
    
        const d = new Date(year, month - 1, day);
        const weekDay = d.getDay();
        const weekKey = weekDay === 0 ? 6 : weekDay - 1; 
        weeklyData[weekKey] = (weeklyData[weekKey] || 0) + 1;
    
        const monthKey = day - 1;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
        
        const yearKey = month - 1
        annualData[yearKey] = (annualData[yearKey] || 0) + 1;
      });

      setDailyChartData(formatChartData(dailyLabels, dailyData));
      setWeeklyChartData(formatChartData(weeklyLabels, weeklyData));
      setMonthlyChartData(formatChartData(monthlyLabels, monthlyData));
      setAnnualChartData(formatChartData(annualLabels, annualData));

      setData(formatChartData(dailyLabels, dailyData));
    };

    useEffect(() => {
      (async () => {
        const completedTasks = await fetchCompletedTasks();
        processCompletedTasksData(completedTasks);
      })();
    }, []);

    const setDaily = () => {
      setData(dailyChartData);
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

    
      
      return (
        <>
        <MDBContainer>
          <Bar data={data}
            style={{ maxHeight: '600px' }}
          />
        </MDBContainer>
        <div>
          <Button size="sm" onClick={() => setDaily()}>D</Button>
          <Button size="sm" onClick={() => setWeekly()}>W</Button>
          <Button size="sm" onClick={() => setMonthly()}>M</Button>
          <Button size="sm" onClick={() => setAnnual()}>Y</Button>

        </div>
        </>
      );
}
