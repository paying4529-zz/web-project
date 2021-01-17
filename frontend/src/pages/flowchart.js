import React, { useState, useEffect } from 'react';
import '../App.css';
import Sheet from "./sheet"
import { GetClasses } from '../axios'

function FlowChart(){
    const [groups,setgroups] = useState([])   
    const {data} = GetClasses()
    useEffect(()=>{
      if(data){
        if(data.getClasses){
          const newgroup = data.getClasses.classlist
          if(newgroup){setgroups(newgroup)}
        }
      }
    },[data])
    return <div style={{padding:"50px"}}><Sheet groups={groups}/></div>
}
export default FlowChart;