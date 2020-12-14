import './calander_style.css';
import { useRouteMatch } from "react-router-dom";
import React from 'react'

function Calander(){
    var { url } = useRouteMatch()
    const username = url.split("/")[1]
    const weekdayname = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    return(
            <div class="Theme-black">
                <h1>{username}'s Calendar</h1>
                <div>
                    <input type="text" placeholder="Type something..." id="cal-input"></input>
                    <input type="color" id="cal-color"></input>
                    <button id="cal-button">Add to Calendar</button>
                </div>
                <div>
                    <table id='Cal-main'>
                        <tr class="Cal-title-row">{weekdayname.map(day=>{return <td>{day}</td>})}</tr>
                        <tr class="Cal-content-row">
                            <td class='date notclickable'></td>
                            <td class='date notclickable'></td>
                            <td class='date notclickable'></td>
                            <td class='date notclickable'></td>
                            <td class='date'>1</td>
                            <td class='date'>2</td>
                            <td class='date'>3</td>
                        </tr>
                        <tr class="Cal-content-row">
                        <td class='date'>4</td>
                        <td class='date'>5</td>
                        <td class='date'>6</td>
                        <td class='date'>7</td>
                        <td class='date'>8</td>
                        <td class='date'>9</td>
                        <td class='date'>10</td>
                        </tr>
                        <tr class="Cal-content-row">
                            <td class='date'>11</td>
                            <td class='date'>12</td>
                            <td class='date'>13</td>
                            <td class='date'>14</td>
                            <td class='date'>15</td>
                            <td class='date'>16</td>
                            <td class='date'>17</td>
                        </tr>
                        <tr class="Cal-content-row">
                            <td class='date'>18</td>
                            <td class='date'>19</td>
                            <td class='date'>20</td>
                            <td class='date'>21</td>
                            <td class='date'>22</td>
                            <td class='date'>23</td>
                            <td class='date'>24</td>
                        </tr>
                        <tr class="Cal-content-row">
                            <td class='date'>25</td>
                            <td class='date'>26</td>
                            <td class='date'>27</td>
                            <td class='date'>28</td>
                            <td class='date'>29</td>
                            <td class='date'>30</td>
                            <td class='date notclickable'></td>
                        </tr>
                    </table>
                </div>
            </div>
    )
}

export default Calander;