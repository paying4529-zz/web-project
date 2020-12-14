import './todo_style.css';
import React, {  useEffect, useState } from "react";
import Header from "./todo_components/Header";
import Section from "./todo_components/Section";
import Footer from "./todo_components/Footer";
import { useRouteMatch} from "react-router-dom";
import { GetSubClass } from '../axios'

function TodoList(){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const [state, setState] = useState(0)
    const [total, setTotal] = useState(0)
    const [clear, setClear] = useState(false)
    const setState0 = () => setState(0)
    const setState1 = () => setState(1)
    const setState2 = () => setState(2)
    const setClearTrue = () => setClear(true)
    useEffect(()=>{
        async function getsubclass(){
            var subclass = await GetSubClass(username)
            console.log(subclass)
        }
        getsubclass()
    })
    return (
        <div className="todo-app__root">
            <Header text={`${username}'s TODOs`}/>
            <Section username={username}
                setTotal={setTotal} 
                statenow={state}
                clear={clear}
                setClear={setClear}/>
            <Footer total={total} 
                setState0={setState0} 
                setState1={setState1} 
                setState2={setState2} 
                setClearT={setClearTrue}/> 
        </div>
    );
}
export default TodoList;