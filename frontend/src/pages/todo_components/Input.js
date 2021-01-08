import React from "react";

function Input(props){
    const handleKeyUp = (event) => {
        var keyCode = event.keyCode ? event.keyCode : event.which;
        if(keyCode === 13 && event.target.value !== ""){
            console.log("Input: setValue, saveTodoToBack")
            // props.setValue(event.target.value);
            props.setValueAndSave(event.target.value);
            event.target.value="";
        }
    }
    return (
        <input onKeyUp={handleKeyUp} name="input" 
            type="text" className="todo-app__input" 
            placeholder="What needs to be done?"/>
    );
}

export default Input;
