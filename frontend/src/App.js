import './App.css';
import { clickToGet, newuser, userlogin } from './axios'
import React, { useState } from 'react'


function App() {
  const [clicked, setClick] = useState(false)
  const [message, setMsg] = useState("")
  const [loginSuccess, setLogin] = useState(false)
  const [registerSuccess, setSuccess] = useState(false)
  const [username, setName] = useState("")
  const [password, setpwd] = useState("")  
  const [userclass, setClass] = useState("") 
  return (
    <div className="App">
      <p>Username: </p>
      <input value={username}
            onChange={(e) => setName(e.target.value)}></input>
      <p>Password: </p>
      <input value={password}
            onChange={(e) => setpwd(e.target.value)}></input>
      <p>Class: </p>
      <input value={userclass}
            onChange={(e) => setClass(e.target.value)}></input>
      <button onClick={async () => {
          setClick(true)
          const userinfo = { username: username,
                             password: password,
                             userclass: userclass     }
          let msg = await newuser(userinfo)
          setMsg(msg)
          if(msg.split(" ")[0] === 'new'){
            setSuccess(true)
          }
        }}
        disabled={!userclass}>Register</button>
      <button onClick={async () => {
          setClick(true)
          const userinfo = { username: username,
                             password: password  }
          let msg = await userlogin(userinfo)
          setMsg(msg)
          if(msg.split(" ")[0] === 'correct'){
            setLogin(true)
          }
        }}
        disabled={!password}>Login</button>
      <button onClick={async () => {
          setLogin(false)
        }}
        disabled={!loginSuccess}>Logout</button>
      <button onClick={async () => {
          setClick(true)
          let msg = await clickToGet()
          setMsg(msg)
      }}>get list</button>

      {clicked? <div>{message}</div>:<></>}
      {loginSuccess?<div>Hi, {username}</div>:<div>not login</div>}
    </div>
  );
}

export default App;
