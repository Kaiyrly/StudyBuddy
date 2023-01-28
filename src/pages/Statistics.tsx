import React, { useState } from 'react'
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import Button from 'react-bootstrap/Button';
import { dailyStats, weeklyStats, monthlyStats, annualStats } from '../samples';
import "chart.js/auto";
import '../App.css'

export const Statistics: React.FC = () => {
    const [data, setData] = useState(dailyStats)

    const setDaily = () => {
      setData(dailyStats)
    }
    const setWeekly = () => {
      setData(weeklyStats)
    }
    const setMonthly = () => {
      setData(monthlyStats)
    }
    const setAnnual = () => {
      setData(annualStats)
    }
      
      return (
        <>
        <MDBContainer>
          <Bar data={data}
            style={{ maxHeight: '600px' }}
          />
        </MDBContainer>
        <div>
          <Button size="sm" onClick={(setDaily)}>D</Button>
          <Button size="sm" onClick={(setWeekly)}>W</Button>
          <Button size="sm" onClick={(setMonthly)}>M</Button>
          <Button size="sm" onClick={(setAnnual)}>Y</Button>
        </div>
        </>
      );
}
