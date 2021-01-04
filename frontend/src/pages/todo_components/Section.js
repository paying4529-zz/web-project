import React, { useEffect, useState } from "react";
import List from "./List"
import Input from "./Input"
import { saveTodo, getTodo } from '../../axios'
import { useRouteMatch} from "react-router-dom";

function Section({setTotal,statenow,clear,setClear}){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const [start, setStart] = useState(1)
    const [id, setId] = useState(0)
    const [items, setItems] = useState([])
    const [clearid, setClearId] = useState(null)
    const setValue = (v) => {
        var newItems = items.slice();
        newItems = newItems.concat({value: v, isComplete: false, id: id});
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
            setClear(false);
        }
        async function saveTodoToBack(){
            const todoitem = { username: username, itemslist: items  }
            let msg = await saveTodo(todoitem)
            console.log(msg)
        }
        if(start){ getTodoFromBack() }
        else{ saveTodoToBack() }
        
        async function getTodoFromBack(){  
            const { msg, contents } = await getTodo(username)
            if(msg==="success"){
                if(contents[0]){
                    const itemlist = contents[0].itemslist
                    const lastid = itemlist[itemlist.length-1].id
                    setId(lastid+1)
                    setItems(itemlist)
                }
            }
            setStart(0)
        }
        
    })

    return (
        <section className="todo-app__main" id="main">
            <Input setValue={setValue}/>
            <List items={items} 
                statenow={statenow}
                clickk={click}
                countTotal={countTotal} 
                setClearId={setClearId} />
        </section>
    );
}

export default Section;
