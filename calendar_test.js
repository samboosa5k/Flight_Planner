import React, { useState } from 'react';
import ReactDOM from 'react-dom';


/* 
    Global variable imports
*/
import { date } from "./src/tools.js";



/* 
    Style imports
*/
import './src/styles/bootstrap.min.css';

const CalendarTest = () => {
    //  State
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2020);

    //  Variables
    const monthNames = ['January','February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['mon','tue','wed','thu','fri','sat','sun'];

    //  Get nr of days for current month, 
    //  --> year & month should just be numbers
    const nrDays = () => {
        return date().daysInMonth(year, month);
    }

    const generated = () => {
        const fillStart = dayNames.indexOf(date().firstDayOfMonth(year,month,day));
        let arr = [];

        //  Push fillStarts
        for(let i = 0; i < fillStart; i++){
            arr.push(
                <div className="embed-responsive embed-responsive-1by1">
                    <div className="embed-responsive-item border border-secondary"></div>
                </div>
            )
        }

        //  Push real days
        for(let i = 0; i < nrDays(); i++){
            arr.push(
                <div className="embed-responsive embed-responsive-1by1">
                    <div className="embed-responsive-item border border-secondary">{i+1}</div>
                </div>
            )
        }

        const fillEnd = (arr.length > 35 && arr.length < 42) ? 42-arr.length : 35-arr.length;

        for(let i = 0; i<(fillEnd); i++){
            arr.push(
                <div className="embed-responsive embed-responsive-1by1">
                    <div className="embed-responsive-item border border-secondary"></div>
                </div>
            )
        }

        let temp = [];
        let output = [];

        //  Actually generate the rows
        arr.forEach((calSquare, index) => {
            temp.push(calSquare);
            
            if(temp.length === 7 || index === arr.length-1){
                output.push(
                    <div class="row" key={`calender_row_${index}`}>
                        <div class="col d-flex flex-row">
                        {temp}
                        </div>
                    </div>
                )
                temp = [];
            }
        });

        return output;
    }

    const monthChange = (e) => {
        e.preventDefault();
        switch(e.target.name){
            case 'prev':
                setMonth(month-1);
                break;
            case 'next':
                setMonth(month+1);
                break;
        }
    }

    return (
        <div className="container">
            {/* Day names */}
            <div className="row">
                <div className="col text-center">
                    <a href="#" name="prev" onClick={(e)=>{monthChange(e)}}>&larr;</a>
                    {monthNames[month]}
                    <a href="#" name="next" onClick={(e)=>{monthChange(e)}}>&rarr;</a>
                </div>
            </div>

            {/* Day names */}
            <div className="row">
                <div class="col d-flex flex-row justify-content-around">
                    {
                        dayNames.map((name,index)=>{
                            return (
                                <div className="col text-center" key={`day_name_${name+index}`}>{name}</div>
                            )
                        })
                    }
                </div>
            </div>

            {
                generated()
            }

        </div>
    )
};

ReactDOM.render( <CalendarTest/>, document.getElementById( 'root' ) );
