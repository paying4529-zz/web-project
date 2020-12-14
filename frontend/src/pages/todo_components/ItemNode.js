import React,{ useEffect } from "react";
import Wrapper from "./Wrapper";
import xImg from '../img/x.png';
function ItemNode({value,id,clickk,countTotal,setClearId,complete}){
    useEffect(()=>countTotal())
    return(
        <li className="todo-app__item" 
            id={id+100}
            style={{textDecoration: complete? "line-through":"none",
                    opacity: complete? 0.6:1,
                    backgroundColor: complete? "#01446b":"white",
                    color: complete? "#dddddd":"inherit",
        }}>
            <Wrapper id={id} 
                     clickk={clickk} 
                     complete={complete}/>
            <h1 className="todo-app__item-detail">{value}</h1>
            <img src={xImg} 
                 alt="x" 
                 className="todo-app__item-x" 
                 onClick={()=>setClearId(id)}/>
        </li>
    )
}

export default ItemNode;
