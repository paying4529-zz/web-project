import React,{ Component } from "react";
import ItemNode from "./ItemNode";

class List extends Component{
    constructor(props){
        super(props);
        this.state={
            items: this.props.items,
            statenow: this.props.statenow,
            clearid:null,
        };
    }
    checkState = (items,state) => {
        if(state===0){
            return items;
        }else if(state===1){
            return items.filter(item => !item.isComplete);
        }else{
            return items.filter(item => item.isComplete);
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps.statenow !== this.props.statenow) {
            this.setState({statenow: this.props.statenow,});
        }
        if(prevProps.items !== this.props.items) {
            this.setState({items: this.props.items,});
        }
        if(this.state.clearid!==null){
            this.props.setItems({clearid:this.state.clearid});
            this.setState({clearid:null,});
        }
    }
    render() {
        const clickk=this.props.clickk;
        const countTotal=this.props.countTotal;
        return (
            <ul className="todo-app__list" id="todo-list">{
                this.checkState(this.state.items,this.state.statenow)
                .map(item => {
                    return <ItemNode value={item.value} 
                        id={item.id} 
                        clickk={clickk} 
                        countTotal={countTotal}
                        setItems={this.setState.bind(this)}
                        complete={item.isComplete}/>
                })}
            </ul>
        );
    }
}
export default List;
