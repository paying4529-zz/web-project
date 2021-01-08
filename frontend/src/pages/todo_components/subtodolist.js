import '../todo_style.css';
import React, { useState } from "react";
import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";

function SubTodoList({username,userclass,my}){
    const [state, setState] = useState(0)
    const [total, setTotal] = useState(0)
    const [clear, setClear] = useState(false)
    const setState0 = () => setState(0)
    const setState1 = () => setState(1)
    const setState2 = () => setState(2)
    const setClearTrue = () => setClear(true)

    return (
        <div className="todo-app__root">
            <Header text={`${username}'s TODOs`}/>
            <Section username={username}
                userclass={userclass}
                setTotal={setTotal} 
                statenow={state}
                clear={clear}
                setClear={setClear}
                my={my}
            />
            <Footer total={total} 
                setState0={setState0} 
                setState1={setState1} 
                setState2={setState2} 
                setClearT={setClearTrue}/> 
        </div>
    );
}
export default SubTodoList;