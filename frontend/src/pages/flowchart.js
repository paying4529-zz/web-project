import React, { useState, useEffect } from 'react';
import '../App.css';
import Sheet from "./sheet"
import { GetClasses } from '../axios'
import { Button } from '@material-ui/core';

function FlowChart(){
    const [groups,setgroups] = useState([])   
    const [uniqueclass,setClass] = useState([])
    const [selectrow, setRow] = useState(0)
    const [mission, setMission] = useState(0)   // 1 for add above, 2 for add below
    const {data} = GetClasses()
    useEffect(()=>{
      if(data){
        if(data.getClasses){
          const newgroup = data.getClasses.classlist
          if(newgroup){
            setgroups(newgroup)
            const newclass = []
            for (const g of newgroup){ 
                if(!newclass.includes(g.label.split(" ")[0])){
                    if(g.label.split(" ")[0]=="general"){ newclass.push("director") }
                    else{ newclass.push(g.label.split(" ")[0]) }
                }
            }
            setClass(newclass)
          }
        }
      }
    },[data])
    return <div style={{padding:"50px"}}>
      <h2 className="title" style={{marginBottom:"40px"}}>Double click to edit the flowchart...</h2>
      {uniqueclass.length==0?<></>:<Sheet groups={uniqueclass} selectrow={selectrow} setRow={setRow} mission={mission} setMission={setMission}/>}
      <Button variant="contained" color="primary" style={{margin:"10px"}} onClick={()=>setMission(1)}>add member row</Button>
      {/* {uniqueclass.map(g=>{return<Button variant="contained" color="primary" style={{margin:"10px"}} >{g}</Button>})} */}
      </div>
}
export default FlowChart;