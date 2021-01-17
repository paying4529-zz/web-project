import '../App.css';
import React, { useState,useEffect } from 'react'
import { useRouteMatch} from "react-router-dom";
import Countdown from './countdown';
import { Paper} from '@material-ui/core';

function Userhome_manager({enddate}){
    var { url } = useRouteMatch()
    const username = url.split("/")[-1]
    const [showcountdown, setShow] = useState(false)
    useEffect(()=>{
      if(enddate){setShow(true)}
    },[enddate])
    return (
      <div className="Home_page">
        <div className="column1">
            {showcountdown?<Paper className="Countdown">
              <h3 className="title">Seminar is coming soon:</h3>
              <h3 className="title">{enddate?enddate.split("T")[0]:""}</h3>
              <Countdown enddate={enddate} />
            </Paper>:<></>
            }
        </div>
        <div className="column2">
            
        </div>
      </div>
    )
  }

export default Userhome_manager;