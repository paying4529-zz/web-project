import React from "react";
import ItemNode from "./ItemNode";

function List({items,statenow,clickk,countTotal,setClearId,my}){
    const checkState = (items,state) => {
        if(state===0){
            return items;
        }else if(state===1){
            return items.filter(item => !item.isComplete);
        }else{
            return items.filter(item => item.isComplete);
        }
    }
    return (
        <ul className={my?"todo-app__list my":"todo-app__list"} id="todo-list">{
            checkState(items,statenow)
            .map(item => {
                return <ItemNode value={item.value} 
                    id={item.order} 
                    clickk={clickk} 
                    countTotal={countTotal}
                    setClearId={setClearId}
                    complete={item.isComplete}/>
            })}
        </ul>
    );

}

export default List;
