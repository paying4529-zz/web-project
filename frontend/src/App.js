import './App.css';
import { clickToGet, newuser, userlogin } from './axios'
import React, { useState } from 'react'
import Select from "react-select"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, List, ListItem} from '@material-ui/core';
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

function Login(){
  const [clicked, setClick] = useState(false)
  const [message, setMsg] = useState("")
  const [loginSuccess, setLogin] = useState(false)
  const [username, setName] = useState("")
  const [password, setpwd] = useState("")  
  return (
    <div className="App">
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
      <Button variant="contained" 
        onClick={async () => { setLogin(false) }}
        disabled={!loginSuccess}>Logout</Button>
      {clicked? <div>{message}</div>:<></>}
      {loginSuccess?<div>Hi, {username}</div>:<div>not login</div>}
    </div>
  )
}

function Home(){
  const [clicked, setClick] = useState(false)
  const [message, setMsg] = useState("")
  return (
    <div className="App">
      <h2>Home</h2>
      <Button variant="contained"
        onClick={async () => {
          setClick(true)
          let msg = await clickToGet()
          setMsg(msg)
        }}>get list</Button>
      {clicked? <div>{message}</div>:<></>}
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <List component="nav">
          <ListItem><Link to="/">Home</Link></ListItem>
          <ListItem><Link to="/register">Register</Link></ListItem>
          <ListItem><Link to="/login">Login</Link></ListItem>
        </List>
        <Switch>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
