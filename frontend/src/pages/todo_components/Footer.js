import React from "react";
import Button from "./Button";

function Total({total}){
    return <div id="total" className="todo-app__total">{total} left</div>
}

function Footer({total, setState0, setState1, setState2, setClearT}){
    return (
        <footer className="todo-app__footer" id="todo-footer">
            <Total total={total}/>
            <ul className="todo-app__view-buttons">
                <Button id="all" text="All" stateset={setState0}/>
                <Button id="active" text="Active" stateset={setState1}/>
                <Button id="complete" text="Completed" stateset={setState2}/>
            </ul>
            <div className="todo-app__clean">
                <Button id="clear" text="Clear Completed" stateset={setClearT}/>
            </div>
        </footer>
    )
}

export default Footer;