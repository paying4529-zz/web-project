import '../App.css';
import { GetUsers } from '../axios'
import React, { useState } from 'react'
import { Button} from '@material-ui/core';


function Home(){
    const [clicked, setClick] = useState(false)
    const data = GetUsers()
    
    return (
      <div className="Home_page">
        <h2>Home</h2>
        <h1>try</h1>
        <div class="button">
        <Button variant="contained"
          onClick={()=>{setClick(true)}}>
          get list</Button></div>
        {clicked? <div>{data.getUsers.map(e => (<div>{`${e.username}||${e.password}||${e.userclass}`}</div>))}</div>:<></>}
      </div>
    )
  }

export default Home;
