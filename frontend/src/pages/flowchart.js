import React, { useState, useEffect } from 'react';
import '../App.css';
import Sheet from "./sheet"
import { GetClasses } from '../axios'
import { Button } from '@material-ui/core';
import { GetJobs, NewJob } from '../axios'

function FlowChart(){
    const [groups,setgroups] = useState([])   
    const [uniqueclass,setClass] = useState([])
    const [selectrow, setRow] = useState(0)
    const [mission, setMission] = useState(0)   // 1 for add above, 2 for add below
    const {data} = GetClasses()
    const {createJob} = NewJob()
    const {job,setToGet} = GetJobs()
    const [grid,setGrid] = useState([[]])
    useEffect(()=>{
      if(job){
        console.log("get classes")
        console.log(job)
        if(job.getJob){
          const newgrid = job.getJob.joblist
          if(newgrid){setGrid(newgrid)}
        }
      }
    },[job])
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
    const save = async () => {
      var newItems = grid.slice();
      newItems.forEach((e) => {delete e.__typename})
      const addjobinput = {joblist:newItems, mutation: "MODIFIED"}
      let msg = await createJob(addjobinput)
      setToGet(true)
    }
    return <div style={{padding:"50px"}}>
      <h2 className="title" style={{marginBottom:"40px"}}>Double click to edit the flowchart...</h2>
      {uniqueclass.length==0?<></>:<Sheet grid={grid} setGrid={setGrid} groups={uniqueclass} selectrow={selectrow} setRow={setRow} mission={mission} setMission={setMission}/>}
      <Button variant="contained" color="primary" style={{margin:"10px"}} onClick={()=>setMission(1)}>add member row</Button>
      <Button variant="contained" color="primary" style={{margin:"10px"}} onClick={save}>save sheet</Button>
      {/* {uniqueclass.map(g=>{return<Button variant="contained" color="primary" style={{margin:"10px"}} >{g}</Button>})} */}
      </div>
}
export default FlowChart;