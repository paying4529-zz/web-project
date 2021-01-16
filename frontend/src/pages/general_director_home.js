import '../App.css';
import React, { useState,useEffect } from 'react'
import { useRouteMatch} from "react-router-dom";
import Countdown from './countdown';
import DatePicker from 'react-date-picker';
import { Paper, Card, CardContent } from '@material-ui/core';
import CreateSelect from "./createselect";
import { makeStyles } from '@material-ui/core/styles';
import { SetEnddate } from '../axios'

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 40,
    margin: "30px"
  },
  content:{
    padding:"10px",
  }
})
function Userhome_director({enddate,setEnddate}){
    var { url } = useRouteMatch()
    const username = url.split("/")[-1]
    const [showcountdown, setShow] = useState(false)
    const [enddate2, onChange] = useState("");           //////////////// need adding to backend
    const [groupOptions,setoptions] = useState([])    //////////////// need adding to backend
    const {newEnddate, isSuccess} = SetEnddate()
    useEffect(()=>{
      console.log(enddate)
      if(enddate){setShow(true)}
    },[enddate])
    useEffect(()=>{
      if(enddate2){
        setEnddate(String(enddate2))
        console.log(enddate2)
        console.log(enddate)
        newEnddate(String(enddate2))
      }
    },[enddate2])

    const classes = useStyles();
    return (
      <div className="Home_page">
        <div className="column1">
            {showcountdown?<Paper className="Countdown">
              <h3 className="title">Seminar is coming soon:</h3>
              <h3 className="title">{enddate?enddate.slice(0,16):""}</h3>
              <Countdown enddate={enddate} />
            </Paper>:<></>
            }
            <div className="pick">
              <h3>Pick the date of your seminar:</h3>
              <DatePicker
                onChange={onChange}
                value={enddate2}
                format="MM-dd-y"
                dayPlaceholder="DD"
                monthPlaceholder="MM"
                yearPlaceholder="YYYY"
              />
            </div>
        </div>
        <div className="column2">
            <div className="addgroup">
              <h3>Manage your organization</h3>
              <CreateSelect options={groupOptions} setoptions={setoptions} />
            </div>
            {groupOptions.length!==0 ? groupOptions.map(group => <Card className={classes.root}> <CardContent className={classes.content}>{group.value}</CardContent></Card>):<></>}
            
        </div>
        
        
        
      </div>
    )
  }

export default Userhome_director;