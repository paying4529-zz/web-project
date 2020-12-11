import '../App.css';
import { userlogin } from '../axios'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

function Userpage({setLogout}){
  const { username } = useParams()
  return(
    <>
      <h2>{username}'s userpage</h2>
      <Button variant="contained" 
            onClick={setLogout}>Logout</Button>
    </>
  )
}

function Login(){
    const [clicked, setClick] = useState(false)
    const [message, setMsg] = useState("")
    const [loginSuccess, setLogin] = useState(false)
    const [username, setName] = useState("")
    const [password, setpwd] = useState("")  
    const setLogout = () => setLogin(false)
    return (
      <Router>
        {loginSuccess?(
          <div className="App">
            <Redirect to={"/"+username}/>
            <Route path="/:username"><Userpage setLogout={setLogout}/></Route>   
          </div>
        ):(
          <div className="App">
            <Redirect to="/login"/>
            <h2>Login</h2>
            <p>Username: </p>
            <input value={username}
                  onChange={(e) => setName(e.target.value)}></input>
            <p>Password: </p>
            <input value={password}
                  onChange={(e) => setpwd(e.target.value)}></input>
            <Button variant="contained" 
              onClick={async () => {
                  setClick(true)
                  const userinfo = { username: username, password: password  }
                  let msg = await userlogin(userinfo)
                  setMsg(msg)
                  if(msg.split(" ")[0] === 'correct'){ setLogin(true) }
                }}
              disabled={!password}>Login</Button>
            {clicked? <div>{message}</div>:<></>}
          </div>)}
      </Router>
    )
  }

  export default Login;