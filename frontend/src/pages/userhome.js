import '../App.css';
import React, { useEffect, useState } from 'react'
import { useRouteMatch} from "react-router-dom";
import Userhome_director from "./general_director_home"
import Userhome_manager from "./manager_home"
import Userhome_member from "./member_home"
import { GetEnddate } from '../axios'

function Userhome({myclass}){
    var { url } = useRouteMatch()
    const username = url.split("/")[-1]
    var data = GetEnddate()
    const [enddate, setEnddate] = useState("")
    const mycll = myclass.split(" ")
    useEffect(()=>{
      if(data){
        if(data.getEnddate){
          if(data.getEnddate.enddate!==null){ setEnddate(data.getEnddate.enddate) }
    }}},[data])
    if(mycll[mycll.length-1]==="director"){
      return <Userhome_director enddate={enddate} setEnddate={setEnddate}/>           
    }else if(mycll[mycll.length-1]==="manager"){
      return <Userhome_manager enddate={enddate} />        
    }else if(mycll[mycll.length-1]==="member"){
      return <Userhome_member enddate={enddate} />       
    }else{
      return <></>
    }
    
}

export default Userhome;