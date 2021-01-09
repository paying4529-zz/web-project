import '../todo_style.css';
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Section from "./Section";

function SubTodoList({username,userclass,me}){
    const [state, setState] = useState(0)
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        console.log(userclass)
    })
    return (
        
        <div className="todo-app__root">
            <Header text={`${username}'s TODOs`}/>
            <Section username={username}
                userclass={userclass}
                setTotal={setTotal} 
                statenow={state}
                me={me}
            />
        </div>
    );
}
export default SubTodoList;