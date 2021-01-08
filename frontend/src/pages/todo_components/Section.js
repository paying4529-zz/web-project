import React, { useEffect, useState } from "react";
import List from "./List"
import Input from "./Input"
import { saveTodo, GetTodo } from '../../axios'

function Section({username,userclass, setTotal,statenow,clear,setClear,my}){
    const [start, setStart] = useState(1)
    const [id, setId] = useState(0)
    const [items, setItems] = useState([])
    const [clearid, setClearId] = useState(null)
    const {data, setToGet, setUsername} = GetTodo()

    const click = (ID) => { 
        const newItems = items.slice()
        for(var i=0;i<ID+1;i++){
            if(newItems[i].order===ID){  newItems[i].isComplete = !newItems[i].isComplete;  break;  }
        }
        setItems(newItems)
        countTotal();
    }
    const countTotal = () => {
        var total = items.filter(e => !e.isComplete).length;
        setTotal(total)
    }
    
   const setValueAndSave = async (v) => {
        var newItems = items.slice();
        newItems = newItems.concat({value: v, isComplete: false, order: id, __typename: 'TodoItem'});
        setItems(newItems)
        setId(id+1)
        const todoitem = { username: username, todolist: newItems, userclass: userclass }
        let msg = await saveTodo(todoitem)
        setToGet(true)
    }

    useEffect(()=>{
        if(clearid!=null){
            const newItems = items.slice();
            var index;
            for(var i=0;i<clearid+1;i++){
                if(newItems[i].order===clearid){ index=i; break; }
            }
            newItems.splice(index,1);
            setTotal(newItems.filter(e => !e.isComplete).length);
            setItems(newItems)
            setClearId(null)
        }
        if(clear){
            const newItems = items.slice();
            const after = newItems.filter(e => !e.isComplete);
            setItems(after)
            setClear(false)
        }
    },[clearid,clear])

    function getTodoFromBack(){  
        if(data){
            const getTodos = data.getTodos
            for (const userTodo of getTodos) {
                if(userTodo.username===username){
                    const itemlist = userTodo.todolist
                    if(itemlist.length>0){
                        const lastid = itemlist[itemlist.length-1].order
                        setId(lastid+1)
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

    return (
        <section className="todo-app__main" id="main">
            <Input setValueAndSave={setValueAndSave}/>
            <List items={items} 
                statenow={statenow}
                clickk={click}
                countTotal={countTotal} 
                setClearId={setClearId} 
                my={my}/>
        </section>
    );
}

export default Section;
