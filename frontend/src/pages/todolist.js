import './todo_style.css';
import React, {  useEffect, useState } from "react";
import SubTodoList from "./todo_components/subtodolist";
import { useRouteMatch} from "react-router-dom";
import { GetSubClass } from '../axios'

function TodoList(){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    useEffect(()=>{
        async function getsubclass(){
            var subclass = await GetSubClass(username)
            console.log(subclass)
        }
        getsubclass()
    })
    return (
        <SubTodoList username={username}></SubTodoList>
    );
}
export default TodoList;