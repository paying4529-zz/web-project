import './calander_style.css';
import { useRouteMatch } from "react-router-dom";
import React from 'react';
import Select from "react-select";
import { useState, useEffect } from 'react';
import { GetCalendar } from '../axios';

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
    const [todoList, setTodoList] = useState(Array(monthLong).fill([])); // a list that contains #dayInAMonth sublists
    const [inputTodo, setInputTodo] = useState("");
    const {data, setRefetch} = GetCalendar(username);
    useEffect(() => {
        setStartDay(new Date(year, month - 1, 1).getDay());
        setMonthLong(new Date(year, month, 0).getDate());
        setRefetch({username: username, year: year, month: month});
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
    useEffect(() => {
        console.log(`chosenDate: ${chosenDate}`);
        console.log(`todoList: ${todoList}`);
    }, [chosenDateList])
    useEffect(() => {
        console.log(`todoList: ${todoList}`);
    }, [todoList])

    let calendar = [];
    var date = 1;
    for (var row = 0; row < Math.round((monthLong + startDay) / 7) + 1; row++)
    {
        let week = [];
        for (var col = 0; col < 7; col++)
        {
            if (row === 0)
            {
                if (col < startDay)
                {
                    week.push(<td class='date notclickable'></td>)
                }
                else
                {
                    let todos = [];
                    for (var i = 0; i < todoList[date - 1].length; i++)
                    {
                        todos.push(<div class='date'>{todoList[date - 1][i]}</div>)
                    }
                    week.push(<td class={chosenDateList[date - 1]?'date clicked':'date'} id={`${month}_${date}`}
                               onClick={(e) => setChosenDate([e.target.id.split('_')[0], e.target.id.split('_')[1]])}>
                               {date}{todos}</td>);
                    date++;
                }

            }
            else
            {
                if (date <= monthLong)
                {
                    let todos = [];
                    for (var i = 0; i < todoList[date - 1].length; i++)
                    {
                        todos.push(<div class='date'>{todoList[date - 1][i]}</div>)
                    }
                    week.push(<td class={chosenDateList[date - 1]?'date clicked':'date'} id={`${month}_${date}`}
                              onClick={(e) => setChosenDate([e.target.id.split('_')[0], e.target.id.split('_')[1]])}>
                              {date}{todos}</td>);
                    date++;
                }
                else
                {
                    week.push(<td class='date notclickable'></td>)
                }
            }
        }
        calendar.push(<tr class="Cal-content-row">{week}</tr>)
    }
    return(
            <div class="Theme-black">
                <h1>{username}'s Calendar</h1>
                <div>
                    <input type="text" placeholder="Type something..." id="cal-input" onChange={(e) => {setInputTodo(e.target.value)}}></input>
                    <input type="color" id="cal-color"></input>
                    <button id="cal-button" 
                            onClick={() => { if (inputTodo !== "" && chosenDate[1] !== -1)
                                             {
                                                let tmp = todoList;
                                                console.log("original todolist:", tmp, "index:", chosenDate[1] - 1);
                                                tmp[chosenDate[1] - 1] = [...tmp[chosenDate[1] - 1], inputTodo];
                                                setTodoList(tmp);
                                                setChosenDate([-1, -1]);
                                                setRefetch({username: username, year: year, month: month})
                                             }
                                           }}
                            >Add to Calendar</button>
                    <Select id="cal-year" options={yearoptions} placeholder={2021} 
                            onChange={(e)=>{setYear(e.value)
                                            setChosenDate([-1, -1])}}/>
                    <Select id="cal-month" options={monthoptions} placeholder={"January"}
                            onChange={(e)=>{setMonth(e.value)
                                            setChosenDate([-1, -1])}}/>
                </div>
                <div>
                    <table id='Cal-main'>
                        <tr class="Cal-title-row">{weekdayname.map(day=>{return <td>{day}</td>})}</tr>
                        {calendar}
                    </table>
                </div>
            </div>
    )
}

export default Calander;