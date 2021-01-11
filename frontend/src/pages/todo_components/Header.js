import React from "react";
export default ({ text,userclass }) => {
    return (
        <header className="todo-app__header">
            <h1 className={"todo-app__title "+userclass.split(" ")[0]}>{text}</h1>
        </header>
    );
};
