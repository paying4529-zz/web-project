import React, { useEffect, useState } from "react";
import List from "./List"
import Input from "./Input"
import {MutateTodo, GetTodo } from '../../axios'
import uuid from 'uuid/v4';

function Section({username, userclass, setTotal,statenow,me}){
    const [start, setStart] = useState(1)
    const [order, setOrder] = useState(0)
    const [items, setItems] = useState([])
    const [clearid, setClearId] = useState(null)
    const {data, setToGet, setUsername} = GetTodo()
    const {saveTodo} = MutateTodo()

   const setValueAndSave = async (deadline,todo) => {
        console.log(todo,deadline)
        var newItems = items.slice();
        const newItem = {fromName: me, deadline: deadline, value: todo, isComplete: false, order: order};
        
        newItems.forEach((e) => {delete e.__typename})
        newItems = newItems.concat(newItem);

        setItems(newItems)
        setOrder(order+1)
        console.log(userclass)
        const addtodoinput = { username: username, todolist: newItems, userclass: userclass, mutation: "CREATED"}
        console.log("Section, addtodoinput:", addtodoinput)
        let msg = await saveTodo(addtodoinput)
        setToGet(true)
    }

    useEffect(()=>{
        if(clearid!=null){
            const newItems = items.slice();
            var index;
            for(var i=0;i<clearid+1;i++){
                if(newItems[i].order===clearid){ index=i; break; }
            }
            const delItem = newItems[index];
            delete delItem.__typename;
            newItems.splice(index,1);
            setTotal(newItems.filter(e => !e.isComplete).length);
            setItems(newItems)
            setClearId(null)
            const addtodoinput = { username: username, todolist: newItems, userclass: userclass, mutation: "DELETED"}
            let msg = saveTodo(addtodoinput)
            setToGet(true)
        }
    },[clearid])

    function getTodoFromBack(){  
        if(data){
            const getTodos = data.getTodos
            for (const userTodo of getTodos) {
                if(userTodo.username===username){
                    const itemlist = userTodo.todolist
                    if(itemlist.length>0){
                        const lastid = itemlist[itemlist.length-1].order
                        setOrder(lastid+1)
                        setItems(itemlist)
                    }                       
                }
            }
            setStart(0)
    }}

    useEffect(()=>{ 
        if(start){ 
            setUsername(username)
            getTodoFromBack() 
        }
        
    }, [start, data])

    useEffect(() => {
        console.log("getTodoFromBack")
        getTodoFromBack()
    }, [JSON.stringify(data)])

    return (
        <section className="todo-app__main" id="main">
            <Input setValueAndSave={setValueAndSave}/>
            <List items={items} 
                statenow={statenow}
                setClearId={setClearId} 
                my={me===username}/>
        </section>
    );
}

export default Section;
