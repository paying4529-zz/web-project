import '../App.css';
import { clickToGet} from '../axios'
import React, { useState } from 'react'
import { Button} from '@material-ui/core';

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

export default Home;