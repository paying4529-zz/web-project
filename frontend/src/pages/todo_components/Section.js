import React, { useEffect, useState } from "react";
import List from "./List"
import Input from "./Input"
import { saveTodo, GetTodo } from '../../axios'
import { useRouteMatch} from "react-router-dom";

function Section({setTotal,statenow,clear,setClear,my}){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const [start, setStart] = useState(1)
    const [id, setId] = useState(0)
    const [items, setItems] = useState([])
    const [clearid, setClearId] = useState(null)
    const {data, setToGet, setUsername} = GetTodo()
    
    const setValue = (v) => {
        var newItems = items.slice();
        newItems = newItems.concat({value: v, isComplete: false, id: id, __typename: 'TodoItem'});
        setItems(newItems)
        setId(id+1)
    }
    const click = (ID) => { 
        const newItems = items.slice();
        for(var i=0;i<ID+1;i++){
            if(newItems[i].id===ID){  newItems[i].isComplete = !newItems[i].isComplete;  break;  }
        }
        setItems(newItems)
        countTotal();
    }
    const countTotal = () => {
        var total = items.filter(e => !e.isComplete).length;
        setTotal(total)
    }
    
    useEffect(()=>{
        async function saveTodoToBack(){
            console.log("in save todo")
            console.log(items)
            const todoitem = { username: username, todolist: items, userclass:"group member" }
            ///////////////////////////// hard write userclass need to be changed!!!!!!!!!!!!!!!!!!!!!!!!
            let msg = await saveTodo(todoitem)
            console.log("msg",msg)
            setToGet(true)
        }
        if(!start){
            saveTodoToBack()
        }
    },[items])

    useEffect(()=>{
        if(clearid!=null){
            const newItems = items.slice();
            var index;
            for(var i=0;i<clearid+1;i++){
                if(newItems[i].id===clearid){ index=i; break; }
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
        console.log("get todo from back")
        if(data){
            const getTodos = data.getTodos
            for (const userTodo of getTodos) {
                if(userTodo.username===username){
                    const itemlist = userTodo.todolist
                    if(itemlist.length>0){
                        const lastid = itemlist[itemlist.length-1].id
                        setId(lastid+1)
                        setItems(itemlist)
                    }                       
                }
            }
            setStart(0)
    }}

    useEffect(()=>{ 
        if(start){ getTodoFromBack() 
            setUsername(username)
            console.log("start")
        }
        
    },[start, data, username])

    return (
        <section className="todo-app__main" id="main">
            <Input setValue={setValue}/>
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
