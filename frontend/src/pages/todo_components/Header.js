import React from "react";
export default ({ text,userclass }) => {
    const clss = userclass.split(" ")
    return (
        <header className="todo-app__header">
            <h1 className={"todo-app__title "+clss[clss.length-1]}>{text}</h1>
        </header>
    );
};
