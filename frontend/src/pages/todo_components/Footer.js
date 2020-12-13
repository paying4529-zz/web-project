import React from "react";
import Button from "./Button";

function Total({total}){
    return <div id="total" className="todo-app__total">{total} left</div>
}

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            total: this.props.total,
        };
    }
    componentDidUpdate(prevProps) {
        if(prevProps.total !== this.props.total) {
            this.setState({total: this.props.total});
        }
    }
    StateNow = (s) => {
        this.props.setStateNow({state: s,});
    }
    Clear = () =>{
        this.props.setClear({clear: true,});
    }
    render(){
        return (
            <footer className="todo-app__footer" id="todo-footer">
                <Total total={this.state.total}/>
                <ul className="todo-app__view-buttons">
                    <Button id="all" text="All" stateset={()=>this.StateNow(0)}/>
                    <Button id="active" text="Active" stateset={()=>this.StateNow(1)}/>
                    <Button id="complete" text="Completed" stateset={()=>this.StateNow(2)}/>
                </ul>
                <div className="todo-app__clean">
                    <Button id="clear" text="Clear Completed" stateset={this.Clear}/>
                </div>
            </footer>
        );
    }
}
    
   

export default Footer;