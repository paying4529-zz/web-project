import '../App.css';
import { newuser } from '../axios'
import React, { useState } from 'react'
import Select from "react-select"
import { Button} from '@material-ui/core';

function Register(){
    const [clicked, setClick] = useState(false)
    const [message, setMsg] = useState("")
    const [username, setName] = useState("")
    const [password, setpwd] = useState("")  
    const [userclass, setClass] = useState("") 
    const classoptions = [
      { value: "general director", label: "general director"},
      { value: "section manager", label: "section manager"},
      { value: "group member", label: "group member"},
    ]
    return (
      <div className="App">
        <h2>Register</h2>
        <p>Username: </p>
        <input value={username}
              onChange={(e) => setName(e.target.value)}></input>
        <p>Password: </p>
        <input value={password}
              onChange={(e) => setpwd(e.target.value)}></input>
        <p>Class: </p>
        <Select value={userclass}
                onChange={(e) => {
                  setClass(e)
                }}
                options={classoptions}/>
        <Button variant="contained"
          onClick={async () => {
            setClick(true)
            const userinfo = { username: username,
                               password: password,
                               userclass: userclass.value     }
            let msg = await newuser(userinfo)
            setMsg(msg)
          }}
          disabled={!userclass}>Register</Button>
        {clicked? <div>{message}</div>:<></>}
      </div>
    )
  }
  
  export default Register;