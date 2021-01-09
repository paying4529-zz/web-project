import React from "react";
import {Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper, Checkbox } from '@material-ui/core'

function List({items,statenow,setClearId,my}){
    const checkState = (items,state) => {
        if(state===0){
            return items.map((t,index)=>{t.id=index
                return t});
        }else if(state===1){
            return items.filter(item => !item.isComplete).map((t,index)=>{t.id=index 
                return t});
        }else{
            return items.filter(item => item.isComplete).map((t,index)=>{t.id=index 
                return t});
        }
    }

    const columns = [
        {field: "fromName", headerName: "Manager", width: 80 },
        {field: "deadline", headerName: "Deadline", width: 100 },
        {field: "value", headerName: "Todo details", width: 200 },
    ]
    return (
        <TableContainer component={Paper}>
            <Table className={my?"todo-app__list my":"todo-app__list"}>
            <TableHead>
                <TableRow>
                    <TableCell>Done</TableCell>
                    {columns.map(c=>{return <TableCell style={{ minWidth: c.width }}>{c.headerName}</TableCell>})}
                </TableRow>
            </TableHead>
            <TableBody>
                {checkState(items,statenow).map(item => { 
                    return <TableRow>
                        <Checkbox onClick={() => setClearId(item.order)}/>
                        {columns.map(c=>{
                        const field = c.field
                        return <TableCell style={{ minWidth: c.width }}>{item[field]}</TableCell>})}</TableRow>})}
            </TableBody>
            </Table>
        </TableContainer>
    );

}

export default List;
