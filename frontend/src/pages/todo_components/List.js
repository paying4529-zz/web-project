import React from "react";
import {Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper, Checkbox, IconButton, Tooltip } from '@material-ui/core'
import x from "../img/delete.png"



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
        {field: "fromName", headerName: "Manager", width: "14%" },
        {field: "deadline", headerName: "Deadline", width: "25%" },
        {field: "value", headerName: "Todo details", width: "60%" },
    ]
    return (
        <TableContainer component={Paper}>
            <Table className={my?"todo-app__list my":"todo-app__list"}>
            <TableHead>
                <TableRow>
                    <TableCell style={{ width: "11%" }} >Done</TableCell>
                    {columns.map(c=>{return <TableCell style={{ width: c.width }}>{c.headerName}</TableCell>})}
                </TableRow>
            </TableHead>
            <TableBody>
                {checkState(items,statenow).map(item => { 
                    return <TableRow>
                        <Tooltip title="Delete" onClick={() => setClearId(item.order)}><IconButton aria-label="delete"><img className={"todo-app__item-x"} src={x} /></IconButton></Tooltip>
                        {columns.map(c=>{
                        const field = c.field
                        return <TableCell style={{ width: c.width, textAlign: "center" }}>{item[field]}</TableCell>})}</TableRow>})}
            </TableBody>
            </Table>
        </TableContainer>
    );

}

export default List;
