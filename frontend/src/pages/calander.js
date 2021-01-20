import './calander_style.css';
import { useRouteMatch } from "react-router-dom";
import React from 'react';
import Select from "react-select";
import { useState, useEffect } from 'react';
import { GetCalendar, GetTodoCal } from '../axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import x from './img/x.png'


function Calander(){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const weekdayname = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const yearoptions = [{value: 2019, label: 2019},
                        {value: 2020, label: 2020},
                        {value: 2021, label: 2021},
                        {value: 2022, label: 2022},
                        {value: 2023, label: 2023}];
    const monthoptions = [{value: 1, label: "January"},
                          {value: 2, label: "February"},
                          {value: 3, label: "March"},
                          {value: 4, label: "April"},
                          {value: 5, label: "May"},
                          {value: 6, label: "June"},
                          {value: 7, label: "July"},
                          {value: 8, label: "August"},
                          {value: 9, label: "September"},
                          {value: 10, label: "October"},
                          {value: 11, label: "November"},
                          {value: 12, label: "December"}];
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2021);
    const [startDay, setStartDay] = useState(0); // which day in a week does the month start, 0 stands for Sunday
    const [monthLong, setMonthLong] = useState(31); // how long is the month
    const [chosenDate, setChosenDate] = useState([-1, -1]); // chosen month, date
    const [chosenDateList, setChosenDateList] = useState([]); // a boolean list for indetifying if the date box is chosen
    const [inputTodo, setInputTodo] = useState("");
    const [showTodo, setShowTodo] = useState(false);
    const {data, setRefetch, addToCalendar} = GetCalendar(); // data: a list that contains #dayInAMonth sublists
    const {todolist, updateTodoCal} = GetTodoCal();
    
    useEffect(async () => {
        setStartDay(new Date(year, month - 1, 1).getDay());
        setMonthLong(new Date(year, month, 0).getDate());
        setRefetch({username: username, year: year, month: month}); // avoid GetTodoCal hasn't finished loading
        updateTodoCal({username: username, month: month, year: year, monthLong: monthLong});
    }, [month, year])

    useEffect(() => {
        setChosenDateList(() => {
            let tmp = Array(monthLong).fill(false);
            if (chosenDate[1] > 0)
            {
                tmp[chosenDate[1] - 1] = true;
            }
            return tmp;
        })
    }, [chosenDate])

    let calendar = [];
    var date = 1;
    const deleteCalTodo = (e) => {
        const id = e.target.id;
        const date = id.split('_')[0];
        const order = id.split('_')[1];
        let tmp = data.getCalendar;
        tmp[date - 1].splice(order, 1);
        addToCalendar({username: username, year: year, month: month, todolist: tmp})
    }
    for (var row = 0; row < Math.round((monthLong + startDay) / 7) + 1; row++){
        let week = [];
        for (var col = 0; col < 7; col++){
            if (row === 0){
                if (col < startDay){ week.push(<td class='date notclickable'></td>)}
                else{
                    let todos = [];
                    if (data && data.getCalendar.length > 0){ // data: avoid initializing undefined, data.getCalendar.length: avoid empty array (default return when no data exist)
                        for (var i = 0; i < data.getCalendar[date - 1].length; i++){
                            todos.push(<div class='cal-todo-row'><div class='cal-todo-task'>{data.getCalendar[date - 1][i]}</div>
                                        <img class='cal-x' src={x} id={`${date}_${i}`} onClick={(e) => {deleteCalTodo(e)}}/></div>)
                        }
                    }
                    if (todolist.length > 0 && showTodo){
                        for (var i = 0; i < todolist[date - 1].length; i++){
                            todos.push(<div class='cal-todolist'>{todolist[date - 1][i]}</div>)
                        }
                    }
                    week.push(<td class={chosenDateList[date - 1]?'date clicked':'date'} id={`${month}_${date}`}
                    onClick={(e) => setChosenDate([e.target.id.split('_')[0], e.target.id.split('_')[1]])}>
                    {date}{todos}</td>);
                    date++;
                }
            }else{
                if (date <= monthLong){
                    let todos = [];
                    if (data && data.getCalendar.length > 0){
                        for (var i = 0; i < data.getCalendar[date - 1].length; i++){
                            todos.push(<div class='cal-todo-row'><div class='cal-todo-task'>{data.getCalendar[date - 1][i]}</div>
                                        <img class='cal-x' src={x} id={`${date}_${i}`} onClick={(e) => {deleteCalTodo(e)}}/></div>)
                        }
                    }
                    if (todolist.length > 0 && showTodo){
                        for (var i = 0; i < todolist[date - 1].length; i++){ todos.push(<div class='cal-todolist'>{todolist[date - 1][i]}</div>)}
                    }
                    week.push(<td class={chosenDateList[date - 1]?'date clicked':'date'} id={`${month}_${date}`}
                                  onClick={(e) => setChosenDate([e.target.id.split('_')[0], e.target.id.split('_')[1]])}>
                                  {date}{todos}</td>);
                    date++;
                } else{  week.push(<td class='date notclickable'></td>)}
            }
        }
        calendar.push(<tr class="Cal-content-row">{week}</tr>)
    }
    // ***** button ***** //
    const useStyles = makeStyles((theme) => ({ button: {  margin: theme.spacing(1), }, }));

    return(<div class="Theme-black">
                <h1>{username}'s Calendar</h1>
                <div>
                    <input type="text" placeholder="Type something..." id="cal-input" onChange={(e) => {setInputTodo(e.target.value)}}></input>
                    <button id="cal-button" 
                            onClick={() => { if (inputTodo !== "" && chosenDate[1] !== -1){
                                                let tmp = data.getCalendar;
                                                console.log("original todolist:", tmp, "index:", chosenDate[1] - 1);
                                                if (tmp.length === 0){
                                                    tmp = Array(monthLong).fill([]);
                                                }
                                                tmp[chosenDate[1] - 1] = [...tmp[chosenDate[1] - 1], inputTodo];
                                                // setTodoList(tmp);
                                                setChosenDate([-1, -1]);
                                                addToCalendar({username: username, year: year, month: month, todolist: tmp})
                                    }}}>Add to Calendar</button>
                    <Select id="cal-year" options={yearoptions} placeholder={2021} 
                            onChange={(e)=>{setYear(e.value)
                                            setChosenDate([-1, -1])}}/>
                    <Select id="cal-month" options={monthoptions} placeholder={"January"}
                            onChange={(e)=>{setMonth(e.value)
                                            setChosenDate([-1, -1])}}/>
                    <Button
                        variant="contained"
                        color="default"
                        className={useStyles().button}
                        id="cal-import"
                        onClick={() => {setShowTodo(!showTodo)}}>
                        {showTodo ? 'Hide Todo':'Import Todo'}</Button>
                </div>
                <div>
                    <table id='Cal-main'>
                        <tr class="Cal-title-row">{weekdayname.map(day=>{return <td style={{overflowX:"hidden"}}>{day}</td>})}</tr>
                        {calendar}
                    </table>
                </div>
            </div>
    )
}

export default Calander;