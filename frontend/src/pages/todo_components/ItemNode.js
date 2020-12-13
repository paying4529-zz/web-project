import React,{ Component } from "react";
import Wrapper from "./Wrapper";
import xImg from '../img/x.png';

class ItemNode extends Component{
    xclear = (id) => {
        this.props.setItems({clearid:id});
    }
    componentDidMount(){
        this.props.countTotal();
    }
    render(){
        const value = this.props.value;
        const id = this.props.id;
        const clickk = this.props.clickk;
        return(
            <li className="todo-app__item" 
                id={id+100}
                style={{textDecoration: this.props.complete? "line-through":"none",
                        opacity: this.props.complete? 0.6:1,
                        backgroundColor: this.props.complete? "#7a0064":"white",
                        color: this.props.complete? "#dddddd":"inherit",
                    }}
            >
                <Wrapper id={id} 
                         clickk={clickk} 
                         complete={this.props.complete}/>
                <h1 className="todo-app__item-detail">{value}</h1>
                <img src={xImg} 
                     alt="x" 
                     className="todo-app__item-x" 
                     onClick={()=>this.xclear(id)}/>
            </li>
        );
    }
}
export default ItemNode;
