import React, { useState } from "react";
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(0.2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
    deadline: {
        width: '22%',
        padding: 0,
    },
    todo:{
        width: '59%',
    },
    button: {
        width: '10%',
        marginTop: theme.spacing(2),
    }
  }))
function Input({setValueAndSave}){
    const [deadline,setDeadline] = useState("")
    const [todo, setTodo] = useState("")
    const handleTodo = (event) => {
        setTodo(event.target.value)
    }
    const handleDeadline = (event) => {
        setDeadline(event.target.value)
    }
    const send = () =>{
        setValueAndSave(deadline,todo)
    }
    const classes = useStyles();
    
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField className={classes.deadline} onChange={handleDeadline}  name="input" type="date" variant="outlined" />
            <TextField className={classes.todo} onChange={handleTodo} name="input" label="What needs to be done?" variant="outlined" required={true} />
            <Button className={classes.button} variant="contained" onClick={send}>send</Button>
        </form>

    );
}

export default Input;
