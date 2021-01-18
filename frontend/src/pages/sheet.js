import React, { useState, useEffect } from 'react';
import '../App.css';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

function Sheet({groups}){
    const [start,setStart]=useState(true)
    const timeslot = ["8:00 ~ 10:00","10:00 ~ 12:00","12:00 ~ 13:00","13:00 ~ 15:00","15:00 ~ 17:00"]
    const newclass = []
    for (const g of groups){ 
        if(!newclass.includes(g.label.split(" ")[0])){
            newclass.push(g.label.split(" ")[0])
        }
    }
    var width = Math.floor(1000/newclass.length)
    const [grid,setGrid] = useState([])
    const createColumn = (value,width=width,readOnly=false,className="",colSpan=1) => ({
        value: value,
        readOnly: readOnly,
        width: width,
        colSpan: colSpan,
        className: "cell "+className
    })
    const createfirstRow = (group) => {
        const col1 = [createColumn("",width,true)]
        const col2 = []
        for (var i=0;i<group.length;i++){
            col2.push(createColumn(group[i],width*2,true,"group",2))
        }
        const row1 = col1.concat(col2)
        const col3 = [createColumn("time slot",width,true)]
        const col4 = []
        for (var i=0;i<group.length;i++){
            col4.push(createColumn("job",width,true))
            col4.push(createColumn("member",width,true))
        }
        const row2 = col3.concat(col4)
        return [row1,row2]
    }
    const createRow = (time,groupnum)=>{
        const col1 = [time=="12:00 ~ 13:00"?createColumn(time,width,false,"time noon"):createColumn(time,width,false,"time")]
        const col2 = []
        for (var i=0;i<2*groupnum;i++){
            if(time=="12:00 ~ 13:00"){
                col2.push(createColumn("",width,false,"noon"))
            }else{
                col2.push(createColumn("",width))
            }
        }
        return col1.concat(col2)
    }
    useEffect(()=>{
        if(start){
            const row1 = createfirstRow(newclass)
            const row2 = []
            for(var i=0;i<timeslot.length;i++){
                const r = createRow(timeslot[i],newclass.length)
                row2.push(r)
            }
            setGrid(row1.concat(row2))
            setStart(false)
        }
    },[start,groups])
        
    return (
        <ReactDataSheet
          data={grid}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            setGrid(grid);
          }}
        />
      );
}
export default Sheet;