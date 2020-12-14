import React, { useEffect, useState } from "react";
import List from "./List"
import Input from "./Input"

function Section({setTotal,statenow,clear,setClear}){
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
            if(newItems[i].id===ID){
                newItems[i].isComplete = !newItems[i].isComplete;
                break;
            }
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
                if(newItems[i].id===clearid){
                    index=i;
                    break;
                }
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
