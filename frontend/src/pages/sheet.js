import React, { useState, useEffect } from 'react';
import '../App.css';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { GetJobs, NewJob } from '../axios'

function Sheet({groups,selectrow,setRow,mission,setMission}){
    const [start,setStart]=useState(true)
    const timeslot = ["8:00 ~ 10:00","10:00 ~ 12:00","12:00 ~ 13:00","13:00 ~ 15:00","15:00 ~ 17:00"]
    const {createJob, isSuccess} = NewJob()
    var width = Math.floor(1000/4)
    const [grid,setGrid] = useState([[]])
    useEffect(()=>{
        if(mission==1){
            var timerow = selectrow
            var flag = 1
            while(flag){
                if(grid[timerow].length!==grid[0].length){ timerow -= 1 }
                else{ flag = 0 }
            }
            const noon = grid[timerow][0].value=="12:00 ~ 13:00"
            const newr1 = []
            for(var i=0; i<timerow;i++){ newr1.push(grid[i]) }
            const newr2 = []
            for(var i=0;i<2;i++){
                var newcell = grid[timerow][i]
                newcell.rowSpan += 1
                newr2.push(newcell)
            }
            for(var i=2;i<grid[timerow].length;i++){ newr2.push(grid[timerow][i]) }
            const newr3 = []
            for(var i=timerow+1; i<selectrow+1;i++){ newr3.push(grid[i]) }
            const newr4 = createaddrow(noon)
            const newr5 = []
            for(var i=selectrow+1; i<grid.length;i++){ newr5.push(grid[i]) }
            setGrid(newr1.concat([newr2],newr3,newr4,newr5))
            setMission(0)
        }
    },[mission])
    const createColumn = (value,width=width,readOnly=false,className="",colSpan=1,rowSpan=1) => ({
        value: value,
        readOnly: readOnly,
        width: width,
        colSpan: colSpan,
        className: className,
        rowSpan: rowSpan
    })
    const createfirstRow = () => {
        const col3 = [createColumn("time slot",width,true,"time"),createColumn("schedule",width,true,"time")]
        const col4 = [createColumn("member",width,true),createColumn("job",width,true),createColumn("place",width,true),createColumn("note",width,true)]
        const row2 = col3.concat(col4)
        return [row2]
    }
    const createaddrow = (noon) =>{
        const col2 = []
        for (var i=0;i<4;i++){
            if(noon){ col2.push(createColumn(" ",width,false,"noon")) } 
            else{ col2.push(createColumn(" ",width)) }
        }
        return [col2]
    }
    const createRow = (time)=>{
        const col1 = time=="12:00 ~ 13:00"?[createColumn(time,width,false,"time noon"),createColumn(" ",width,false,"time noon")]:[createColumn(time,width,false,"time"),createColumn(" ",width,false,"time")]
        const col2 = []
        for (var i=0;i<4;i++){
            if(time=="12:00 ~ 13:00"){ col2.push(createColumn(" ",width,false,"noon")) }
            else{  col2.push(createColumn(" ",width)) }
        }
        return col1.concat(col2)
    }
    
    useEffect(()=>{
        if(start){
            const row1 = createfirstRow(groups)
            const row2 = []
            for(var i=0;i<timeslot.length;i++){
                const r = createRow(timeslot[i],groups.length)
                row2.push(r)
            }
            const newsheet = row1.concat(row2)
            setGrid(newsheet)
            setStart(false)
        }
    },[start,groups])
    return (
        <ReactDataSheet
          data={grid}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid2 = grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
                grid2[row][col] = { ...grid[row][col], value };
            });
            setGrid(grid2);
          }}
          onSelect={({ start })=>{ if(start){ setRow(start.i) } }}
        />
      );
}
export default Sheet;