import React, { Component } from "react";
import List from "./List"
import Input from "./Input"

class Section extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statenow: 0,
            id: 0,
            items: [],
            clearid: null,
        };
    }
    idPlus = () => {
        this.setState((state) => ({
            id: state.id+1,         
        }));
    }
    setValue = (v) => {
        var value = v;
        var ID = this.state.id;
        var newItems = this.state.items.slice();
        newItems = newItems.concat({value: value, isComplete: false, id: ID});
        this.setState({items: newItems});
        this.idPlus();
    }
    click = (ID) => { 
        const newItems = this.state.items.slice();
        for(var i=0;i<ID+1;i++){
            if(newItems[i].id===ID){
                newItems[i].isComplete = !newItems[i].isComplete;
                break;
            }
        }
        this.setState({items: newItems});
        this.countTotal();
    }
    countTotal = () => {
        var total = this.state.items.filter(e => !e.isComplete).length;
        this.props.setTotal(total);
    }
    clear = () => { 
        const newItems = this.state.items.slice();
        const after = newItems.filter(e => !e.isComplete);
        this.setState({items: after});
        this.props.setClear({clear: false,});
    }
    clearId = (ID) => {
        const newItems = this.state.items.slice();
        var index;
        for(var i=0;i<ID+1;i++){
            if(newItems[i].id===ID){
                index=i;
                break;
            }
        }
        newItems.splice(index,1);
        this.props.setTotal(newItems.filter(e => !e.isComplete).length);
        this.setState({items: newItems,});
        this.setState({clearid:null,});
        
    }
    componentDidUpdate(prevProps) {
        if(prevProps.statenow !== this.props.statenow) {
          this.setState({statenow: this.props.statenow});
        }
        if(this.props.clear===true){
            this.clear();
        }
        if(this.state.clearid!==null){
            this.clearId(this.state.clearid);
        }
    }
    render() {
        return (
            <section className="todo-app__main" id="main">
                <Input setValue={this.setValue}/>
                <List items={this.state.items} 
                    statenow={this.state.statenow}
                    clickk={this.click}
                    countTotal={this.countTotal} 
                    setItems={this.setState.bind(this)} />
            </section>
        );
    }
}
export default Section;
