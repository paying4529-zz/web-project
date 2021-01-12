import '../App.css';
import React, { useState,useEffect } from 'react'
import { useRouteMatch} from "react-router-dom";
import Countdown from './countdown';
import DatePicker from 'react-date-picker';

function Userhome(){
    var { url } = useRouteMatch()
    const username = url.split("/")[-1]
    const currentDate = new Date()
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    const [showcountdown, setShow] = useState(false)
    const [value, onChange] = useState();
    useEffect(()=>{
      // console.log(value)
      if(value){setShow(true)}
    },[value])
    return (
      <div className="Home_page">
        {showcountdown?<div className="Countdown">
          <h3 className="title">Seminar is coming soon:</h3>
          <Countdown enddate={value} />
        </div>:<></>
        }
        <div className="pick">
          <h3>Pick the date of your Seminar:</h3>
          <DatePicker
            onChange={onChange}
            value={value}
            format="MM-dd-y"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />
        </div>
        
        
      </div>
    )
  }

export default Userhome;