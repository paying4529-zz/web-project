import React from "react";

function Wrapper({id,clickk}){
    return(
        <div className="todo-app__checkbox">
            <input id={id} 
                       type="checkbox" 
                       onClick={() => clickk(id)}></input>
        </div>
    );
}
export default Wrapper;
