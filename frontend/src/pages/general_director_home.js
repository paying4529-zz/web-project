import '../App.css';
import React, { useState,useEffect } from 'react'
import { useRouteMatch} from "react-router-dom";
import Countdown from './countdown';
import DatePicker from 'react-date-picker';
import { Paper, Card, CardContent, Button } from '@material-ui/core';
import CreateSelect from "./createselect";
import { makeStyles } from '@material-ui/core/styles';
import { SetEnddate, GetClasses, MutateClass } from '../axios'

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 40,
    margin: 0,
  },
  content:{
    padding:"10px",
  }
})
function Userhome_director({enddate,setEnddate}){
    var { url } = useRouteMatch()
    const username = url.split("/")[-1]
    const [showcountdown, setShow] = useState(false)
    const [enddate2, onChange] = useState("");         
    const [groupOptions,setoptions] = useState([])   
    const {newEnddate, isSuccess} = SetEnddate()
    const {data,setToGet} = GetClasses()
    const {saveClass} = MutateClass()
    useEffect(()=>{
      if(data){
        console.log("get classes")
        console.log(data)
        if(data.getClasses){
          const classoption = data.getClasses.classlist
          if(classoption){setoptions(classoption)}
        }
      }
    },[data])
    useEffect(()=>{
      if(enddate){setShow(true)}
    },[enddate])
    useEffect(()=>{
      if(enddate2){
        setEnddate(String(enddate2))
        newEnddate(String(enddate2))
      }
    },[enddate2])
    const ssave = async () => {
      var newItems = groupOptions.slice();
      newItems.forEach((e) => {delete e.__typename})
      const addclassinput = {classlist:newItems, mutation: "MODIFIED"}
      let msg = await saveClass(addclassinput)
      setToGet(true)
    }
    const ddelete = async (value)=>{
      const newgroupOptions = groupOptions.filter(op => op.label!==value)
      setoptions(newgroupOptions)
    }
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
            <div className="twocolumns">
              {groupOptions.length!==0 ? groupOptions.map(group =>
              <div className="card" id={group.value} onClick={()=>ddelete(group.value)}><Card className={classes.root}><CardContent className={classes.content}>{group.value}</CardContent>
              </Card></div>):<></>}
            </div>
            <div class="button"><Button variant="contained"
                onClick={ssave}
                disabled={!groupOptions}>Save</Button></div>
        </div>
        
        
        
      </div>
    )
  }

export default Userhome_director;