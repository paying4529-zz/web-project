import '../App.css';
import { GetUsers } from '../axios'
import React, { useState } from 'react'
import { Button} from '@material-ui/core';


function Home(){
    const [clicked, setClick] = useState(false)
    const data = GetUsers()
    
    return (
      <div className="Home_page">
        <h1 className="fronttitle"><p className="change">Welcome to HierarchiOrg!</p></h1>
      </div>
    )
  }

export default Home;
