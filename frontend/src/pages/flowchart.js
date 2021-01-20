import React, { useState, useEffect } from 'react';
import '../App.css';
import Sheet from "./sheet"
import { GetClasses } from '../axios'
import { Button } from '@material-ui/core';
import { GetJobs, NewJob } from '../axios'

function FlowChart({myclass, username}){
    const [groups,setgroups] = useState([])   
    const [uniqueclass,setClass] = useState([])
    const [selectrow, setRow] = useState(0)
    const [mission, setMission] = useState(0)   // 1 for add above, 2 for add below
    const {data} = GetClasses()
    const {createJob} = NewJob()
    const {job,setToGet} = GetJobs()
    const [grid,setGrid] = useState([[]])
    useEffect(()=>{
      if(job){if(job.getJob){
          const newgrid = job.getJob.joblist
          if(newgrid){
            console.log("load new")
            var newgrid2 = newgrid.slice()
            for(var g of newgrid2){
              if(g.length==6){
                if(g[2].value==username){
                  g = g.map(gg=>{
                    if(!gg.className.includes("time")){
                      gg.className=gg.className+" mmee"
                      return gg
                }})}
                else{
                  g = g.map(gg=>{
                    if(gg.className.includes("mmee")){ gg.className=gg.className.replaceAll("mmee","") }
                    return gg
                })}
              }else if(g.length==4){
                if(g[0].value==username){
                  g = g.map(gg=>{ gg.className=gg.className+" mmee"
                  return gg
                })}
                else{
                  g = g.map(gg=>{
                    if(gg.className.includes("mmee")){gg.className=gg.className.replaceAll("mmee","")}
                    return gg
                })}
              }
            }
            setGrid(newgrid2)
    }}}},[job])
    useEffect(()=>{
      if(data){ if(data.getClasses){
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
  }}},[data])
    const save = async () => {
      var newItems = grid.slice();
      newItems.forEach((e) => {e.forEach((ee)=>{delete ee.__typename})})
      const addjobinput = {joblist:newItems, mutation: "MODIFIED"}
      let msg = await createJob(addjobinput)
      setToGet(true)
    }
    return <div style={{padding:"6%"}} className={myclass.includes("member")?"disable":""}>
      {!myclass.includes("member")?<h2 className="title" style={{marginBottom:"40px"}}>Double click to edit the flowchart...</h2>:<></>}
      {uniqueclass.length==0?<></>:<Sheet grid={grid} setGrid={setGrid} groups={uniqueclass} selectrow={selectrow} setRow={setRow} mission={mission} setMission={setMission}/>}
      {!myclass.includes("member")?(<><Button variant="contained" color="primary" style={{margin:"10px",marginTop:"30px"}} onClick={()=>setMission(1)}>add member row</Button>
      <Button variant="contained" color="primary" style={{margin:"10px",marginTop:"30px"}} onClick={save}>save sheet</Button></>):(<></>)}
       {/* {uniqueclass.map(g=>{return<Button variant="contained" color="primary" style={{margin:"10px"}} >{g}</Button>})} */}
      </div>
}
export default FlowChart;