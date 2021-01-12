import '../App.css';
import React, { useState,useEffect } from 'react'
import { useRouteMatch} from "react-router-dom";

function Countdown({enddate}){
    var { url } = useRouteMatch()
    const username = url.split("/")[-1]
    const [timeleft,setTimeleft] = useState({
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
    })
    useEffect(() => {
        const interval = setInterval(() => {
            const date = calculateCountdown(enddate)  ///////////
            date? setTimeleft(date) : stop(interval)
        }, 1000);
        
    }, [enddate])
    const stop = (interval) =>{
        clearInterval(interval);
    }
    const calculateCountdown = (endDate) => {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
        if (diff <= 0) return false
        const newtimeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
        }
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
            newtimeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= newtimeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
            newtimeLeft.days = Math.floor(diff / 86400);
            diff -= newtimeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
            newtimeLeft.hours = Math.floor(diff / 3600);
            diff -= newtimeLeft.hours * 3600;
        }
        if (diff >= 60) {
            newtimeLeft.min = Math.floor(diff / 60);
            diff -= newtimeLeft.min * 60;
        }
        newtimeLeft.sec = diff;
        return newtimeLeft;
    }  
    const addLeadingZeros = (value) => {
        value = String(value);
        while (value.length < 2) { value = '0' + value; }
        return value;
      }
    return (
      <div >
        <span className="Countdown-col">
          <span className="Countdown-col-element">
              <strong>{addLeadingZeros(timeleft.days)}</strong>
              <span>{timeleft.days === 1 ? 'Day' : 'Days'}</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{addLeadingZeros(timeleft.hours)}</strong>
            <span>Hours</span>
          </span>
        </span>


        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{addLeadingZeros(timeleft.min)}</strong>
            <span>Min</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{addLeadingZeros(timeleft.sec)}</strong>
            <span>Sec</span>
          </span>
        </span>
      </div>
    )
  }

export default Countdown;