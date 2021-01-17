import '../App.css';
import React, { useState,useEffect } from 'react'
import { useRouteMatch} from "react-router-dom";
import Countdown from './countdown';
import { Paper} from '@material-ui/core';
import { GetTodo } from '../axios'

function Userhome_manager({enddate}){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const [showcountdown, setShow] = useState(false)
    const {data, setUsername} = GetTodo()
    const [remainTodo, setRemain] = useState(0)
    const [start, setStart] = useState(1)
    useEffect(()=>{
      if(enddate){setShow(true)}
    },[enddate])
    function getTodoFromBack(){  
      if(data){
          const getTodos = data.getTodos
          for (const userTodo of getTodos) {
              if(userTodo.username===username){
                  const itemlist = userTodo.todolist
                  if(itemlist.length>0){ setRemain(itemlist.length) }                       
              }
          }
          setStart(0)
  }}

  useEffect(()=>{ 
      if(start){ 
          setUsername(username)
          getTodoFromBack() 
      }
  }, [start, data])
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
          <h1 className="title" style={{float:"left", padding:"10px 10px 20px 40px"}}>You have...</h1>
          <h2 className="title" style={{clear:"left"}}>{remainTodo} todos remain to be done.</h2>
        </div>
      </div>
    )
  }

export default Userhome_manager;