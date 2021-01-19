import React, { useState, useEffect } from 'react';
import '../App.css';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { GetJobs, NewJob } from '../axios'

function Sheet({groups}){
    const [start,setStart]=useState(true)
    const timeslot = ["8:00 ~ 10:00","10:00 ~ 12:00","12:00 ~ 13:00","13:00 ~ 15:00","15:00 ~ 17:00"]
    const {createJob, isSuccess} = NewJob()
    var width = Math.floor(1000/4)
    const [grid,setGrid] = useState([[]])
    const createColumn = (value,width=width,readOnly=false,className="",colSpan=1) => ({
        value: value,
        readOnly: readOnly,
        width: width,
        colSpan: colSpan,
        className: className
    })
    const createfirstRow = () => {
        const col3 = [createColumn("time slot",width,true,"time"),createColumn("schedule",width,true,"time")]
        const col4 = [createColumn("member",width,true),createColumn("job",width,true),createColumn("place",width,true),createColumn("note",width,true)]
        const row2 = col3.concat(col4)
        return [row2]
    }
    const createRow = (time,groupnum)=>{
        const col1 = time=="12:00 ~ 13:00"?[createColumn(time,width,false,"time noon"),createColumn(" ",width,false,"time noon")]:[createColumn(time,width,false,"time"),createColumn(" ",width,false,"time")]
        const col2 = []
        for (var i=0;i<4;i++){
            if(time=="12:00 ~ 13:00"){
                col2.push(createColumn(" ",width,false,"noon"))
            }else{
                col2.push(createColumn(" ",width))
            }
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
            console.log("sheet",newsheet)

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
        />
      );
}
export default Sheet;