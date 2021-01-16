import '../App.css';
import React, { useEffect } from 'react'
import { useRouteMatch} from "react-router-dom";
import Userhome_director from "./general_director_home"
import Userhome_manager from "./manager_home"
import Userhome_member from "./member_home"
import { GetEnddate } from '../axios'

function Userhome({myclass}){
    var { url } = useRouteMatch()
    const username = url.split("/")[-1]
    useEffect(()=>{
      console.log(myclass)
    })
    var data = GetEnddate()
    useEffect(()=>{
      if(data){
        console.log(data.getEnddate)
        if(data.getEnddate.enddate!==null){
          console.log(data.getEnddate.enddate)
        }
      }
    },[data])
    if(myclass.split(" ")[0]==="general"){
      return <Userhome_director />           
    }else if(myclass.split(" ")[0]==="section"){
      return <Userhome_manager />         //////////// add enddate to prop
    }else if(myclass.split(" ")[0]==="group"){
      return <Userhome_member />          //////////// add enddate to prop
    }else{
      return <></>
    }
    
}

export default Userhome;