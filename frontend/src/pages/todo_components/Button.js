import React from "react";

function Button(props){
    let { id, text, stateset} = props
    return <button id={id} onClick={stateset}>{text}</button>
}
export default Button;
