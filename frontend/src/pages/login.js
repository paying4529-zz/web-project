import '../App.css';
import { UserLogin,GetSubClass } from '../axios'
import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useParams, useRouteMatch } from "react-router-dom";
import { Button, List, ListItem } from '@material-ui/core';
import Calander from "./calander"
import TodoList from "./todolist"
import UserHome from "./userhome"
import FlowChart from "./flowchart"

function Userpage({setLogout}){
  const { url } = useRouteMatch()
  const { username } = useParams()
  var data = GetSubClass(username)
  const [subclass,setSubclass] = useState([])
  const [myclass, setmyclass] = useState("")
  useEffect(()=>{
      if(data){
          const users = data.getSubusers
          const subusers = users.filter(user => user.username!==username)
          const me = users.filter(user => user.username===username)
          setSubclass(subusers)
          setmyclass(me[0].userclass)
      }
  },[data])
  return(
    <Router>
      <div class="usercaption">
        <h4>Hello, {username}</h4>
        <Button variant="contained" 
            onClick={setLogout}>Logout</Button>
      </div>
      <Redirect exact from="/login" to={"/"+username}/>
      <div class="nav_bar user">
      <List component="nav">
        <ListItem><Link to={url}>UserHome</Link></ListItem>
        <ListItem><Link to={url+"/calander"}>Calander</Link></ListItem>
        <ListItem><Link to={url+"/todolist"}>TodoList</Link></ListItem>
        <ListItem><Link to={url+"/flowchart"}>FlowChart</Link></ListItem>
      </List>
      </div>
      <Switch>
          <Route exact path={url}><UserHome myclass={myclass}/></Route>
          <Route path={url+"/calander"}><Calander myclass={myclass}/></Route>
          <Route path={url+"/todolist"}><TodoList myclass={myclass} subclass={subclass}/></Route>
          <Route path={url+"/flowchart"}><FlowChart username={username} myclass={myclass}/></Route>
      </Switch>
    </Router>
  )
}

function Login(){
  const [clicked, setClick] = useState(false)
  const [username, setName] = useState("")
  const [password, setpwd] = useState("") 
  const {loginSuccess, login} = UserLogin(username) 
  const setLogout = () => { login(false); setClick(false) }
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
          <input class="select"
                value={username}
                onChange={(e) => setName(e.target.value)}></input>
          <p>Password: </p>
          <input class="select"
                value={password}
                onChange={(e) => setpwd(e.target.value)}></input>
          <div class="button"><Button variant="contained" 
            onClick={() => {
                setClick(true)
                const userinfo = { username: username, password: password }
                login(userinfo)
                setpwd("")
              }}
            disabled={!password}>Login</Button></div>
          {/* {clicked?<div>{loginSuccess? "login success": "wrong username or password"}</div>:<></>} */}
        </div>)}
    </Router>
  )
}

export default Login;