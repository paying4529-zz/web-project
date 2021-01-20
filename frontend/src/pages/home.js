import '../App.css';
import { GetUsers } from '../axios'
import React, { useState } from 'react'
import { Button} from '@material-ui/core';


function Home(){
    const [clicked, setClick] = useState(false)
    const data = GetUsers()
    
    return (
      <div className="Home_page">
        <h2>Instruction</h2>
        <h3>This is a Hierarchy management app.</h3>
        <div className="ins">
          <h3>If you are general director, you can...</h3>
          <h4>&emsp;Set the end date</h4>
          <h4>&emsp;Manage group organization</h4>
          <h4>&emsp;Manage your calander</h4>
          <h4>&emsp;Assign Todo to members</h4>
          <h4>&emsp;Import Todo to calander</h4>
          <h4>&emsp;Modify the flowchart</h4>
        </div>
        <div className="ins">
          <h3>If you are group manager, you can...</h3>
          <h4>&emsp;Get the end date</h4>
          <h4>&emsp;Assign Todo to members</h4>
          <h4>&emsp;Manage your calander</h4>
          <h4>&emsp;Modify the flowchart</h4>
        </div>
        <div className="ins">
          <h3>If you are group member, you can...</h3>
          <h4>&emsp;Get the end date</h4>
          <h4>&emsp;Manage your calander</h4>
          <h4>&emsp;Receive Todo</h4>
          <h4>&emsp;Read the flowchart</h4>
        </div>
        {/* <div class="button">
        <Button variant="contained"
          onClick={()=>{setClick(true)}}>
          get list</Button></div>
        {clicked? <div>{data.getUsers.map(e => (<div>{`${e.username}||${e.password}||${e.userclass}`}</div>))}</div>:<></>} */}
      </div>
    )
  }

export default Home;
