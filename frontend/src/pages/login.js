import '../App.css';
import { userlogin } from '../axios'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useParams, useRouteMatch } from "react-router-dom";
import { Button, List, ListItem } from '@material-ui/core';
import Calander from "./calander"
import TodoList from "./todolist"

function Userpage({setLogout}){
  const { url } = useRouteMatch()
  const { username } = useParams()
  return(
    <Router>
      <h2>{username}'s userpage</h2>
      <Button variant="contained" 
            onClick={setLogout}>Logout</Button>
      <List component="nav">
        <ListItem><Link to={url+"/calander"}>Calander</Link></ListItem>
        <ListItem><Link to={url+"/todolist"}>TodoList</Link></ListItem>
      </List>
      <Switch>
          <Route path={url+"/calander"}><Calander /></Route>
          <Route path={url+"/todolist"}><TodoList /></Route>
      </Switch>
    </Router>
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
          <div className="user_page">
            <Redirect to={"/"+username}/>
            <Route path="/:username"><Userpage setLogout={setLogout}/></Route>   
          </div>
        ):(
          <div className="login_page">
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