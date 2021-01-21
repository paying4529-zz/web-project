import './todo_style.css';
import React, { useState, useEffect } from "react";
import SubTodoList from "./todo_components/subtodolist";
import { useRouteMatch} from "react-router-dom";
import {FormControl, MenuItem, InputLabel,Select, Chip, Input, Button, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { SubMsg } from '../axios.js'

function TodoList({myclass,subclass}){
    const clss = myclass.split(" ")
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const [select, setSelect] = useState([])
    const [selectclass, setSelectclass] = useState([])
    const [open, setOpen] = useState(false)
    const {msg, clearMsg} = SubMsg(username)
    
    useEffect(() => {
        console.log("msg:", msg)
        if (msg !== "") {
            setOpen(true)
        }
    }, [msg])

    const handleClose = () => {
        setOpen(false)
        clearMsg()
    }

    const handleChange = (e) =>{
        if(e.target.value.length!==0){
            setSelect(e.target.value)
            var classlist = []
            for (let i = 0; i < e.target.value.length; i += 1) {
                console.log(e.target.value[i])
                var findselectclass = subclass.filter(user => user.username===e.target.value[i])
                if(e.target.value[i]){
                    classlist.push(findselectclass[0].userclass)
                }
            }
            if(classlist.length!==0){
                setSelectclass(classlist)
            }
        }else{
            setSelect([])
            setSelectclass([])
        }
        
    }
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 300,
          textAlign: "left",
          
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    }))
    const classes = useStyles();
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
            <div class="my_todo">
                <SubTodoList username={username} me={username} userclass={myclass} neww={open}/>
            </div>
            {clss[clss.length-1]!=="member"?<div class="sub_todo">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="subuser" style={{color:"white"}}>Select member to see their Todos</InputLabel>
                    <Select id="subuser" value={select} onChange={handleChange} label="Select member" multiple
                            variant="outlined"
                            input={<Input />} 
                            renderValue={(selected) => (
                                <div className={classes.chips}>{selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}</div>
                            )}>
                        {subclass.map(data => <MenuItem value={data.username}>{data.username}</MenuItem>)}
                    </Select>
                </FormControl>
                {select.length!==0?(select.map((name,index) => <SubTodoList username={name} userclass={selectclass[index]} me={username}/> )):<></>}
                {/* {subclass.map(data => {
                    return <SubTodoList username={data.username} userclass={data.userclass} me={username}/>})} */}
            </div>:<></>}
            
        </>
    );
}
export default TodoList;