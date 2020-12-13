import './todo_style.css';
import React, {  useState } from "react";
import Header from "./todo_components/Header";
import Section from "./todo_components/Section";
import Footer from "./todo_components/Footer";

function TodoList(){
    const [state, setState] = useState(0)
    const [total, setTotal] = useState(0)
    const [clear, setClear] = useState(false)
    return (
        <div className="todo-app__root">
            <Header text="todos" />
            <Section setTotal={setTotal} 
                statenow={state}
                clear={clear}
                setClear={setClear}/>
            <Footer total={total} 
                setStateNow={setState} 
                setClear={setClear}/> 
        </div>
    );
}
export default TodoList;