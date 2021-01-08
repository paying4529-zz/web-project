import React, { useEffect } from "react";

function Wrapper({id,clickk,complete}){
    return(
        <div className="todo-app__checkbox">
            <label style={{backgroundColor: complete?"#F4D03F":"gray"}}>
                <input id={id} 
                       type="checkbox" 
                       onClick={() => clickk(id)}></input>
            </label>
        </div>
    );
}
export default Wrapper;
