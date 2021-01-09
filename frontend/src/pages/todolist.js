import './todo_style.css';
import React, {  useEffect, useState } from "react";
import SubTodoList from "./todo_components/subtodolist";
import { useRouteMatch} from "react-router-dom";
import { GetSubClass } from '../axios'

function TodoList(){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
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
    return (
        <>
            <div class="my_todo">
                <SubTodoList username={username} me={username} userclass={myclass}/>
            </div>
            <div class="sub_todo">
                {subclass.map(data => {
                    return <SubTodoList username={data.username} userclass={data.userclass} me={username}/>})}
            </div>
        </>
    );
}
export default TodoList;