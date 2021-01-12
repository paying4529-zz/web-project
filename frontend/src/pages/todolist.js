import './todo_style.css';
import React, { useState } from "react";
import SubTodoList from "./todo_components/subtodolist";
import { useRouteMatch} from "react-router-dom";
import {FormControl, MenuItem, InputLabel,Select, Chip, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function TodoList({myclass,subclass}){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const [select, setSelect] = useState([])
    const [selectclass, setSelectclass] = useState([])
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
            <div class="my_todo">
                <SubTodoList username={username} me={username} userclass={myclass}/>
            </div>
            <div class="sub_todo">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="subuser">Select member to see their Todos</InputLabel>
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
            </div>
        </>
    );
}
export default TodoList;