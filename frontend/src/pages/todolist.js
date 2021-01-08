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
    useEffect(()=>{
        if(data){
            setSubclass(data.getSubusers)
        }
    },[data])
    return (
        <>
            <div class="my_todo">
                <SubTodoList username={username} my={true}/>
            </div>
            <div class="sub_todo">
                {subclass.map(data => {return <SubTodoList username={data.username} userclass={data.userclass} my={false}/>})}
            </div>
        </>
    );
}
export default TodoList;