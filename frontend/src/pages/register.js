import '../App.css';
import { NewUser } from '../axios'
import React, { useState, useEffect } from 'react'
import Select from "react-select"
import { Button} from '@material-ui/core';

function Register(){
    const [clicked, setClick] = useState(false)
    const [username, setName] = useState("")
    const [password, setpwd] = useState("")  
    const [userclass, setClass] = useState("")
    const {createUser, isSuccess} = NewUser()
    useEffect(()=>{
      console.log("msg:", isSuccess)
    })
    const classoptions = [
      { value: "general director", label: "general director"},
      { value: "section manager", label: "section manager"},
      { value: "group member", label: "group member"},
    ]
    return (
      <div className="Register_page">
        <h2>Register</h2>
        <p>Username: </p>
        <input class="select"
              value={username}
              onChange={(e) => {setName(e.target.value)
                                setClick(false)}}></input>
        <p>Password: </p>
        <input class="select"
              value={password}
              onChange={(e) => setpwd(e.target.value)}></input>
        <p>Class: </p>
        <div class="select">
          <Select value={userclass}
                onChange={(e) => {
                  setClass(e)
                }}
                options={classoptions}/>
        </div>
        <div class="button">
        <Button 
          variant="contained"
          onClick={() => {
            setClick(true)
            const userinfo = { username: username,
                               password: password,
                               userclass: userclass.value}
            createUser(userinfo)
          }}
          disabled={!userclass}>Register</Button></div>
        {clicked? <div>{isSuccess ? `add new user: ${username}`: `${username} already exist`}</div>:<></>}
      </div>
    )
  }
  
  export default Register;