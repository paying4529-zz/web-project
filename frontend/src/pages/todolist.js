import './todo_style.css';
import React, {  useEffect, useState } from "react";
import SubTodoList from "./todo_components/subtodolist";
import { useRouteMatch} from "react-router-dom";
import { GetSubClass } from '../axios'

function TodoList(){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const [subClass,setSub] = useState([])
    useEffect(()=>{
        async function getsubclass(){
            var subclass = await GetSubClass(username)
            setSub(subclass)
            console.log("subclass",subclass)
        }
        getsubclass()
    },[username])
    return (
        <>
            <div class="my_todo">
                <SubTodoList username={username} my={true}/>
            </div>
            <div class="sub_todo">
                {subClass.map(name => {return <SubTodoList username={name} my={false}/>})}
            </div>
        </>
    );
}
export default TodoList;