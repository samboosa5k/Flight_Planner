import React, {useState} from 'react';

/* 
    General imports
*/
import {date} from '../../../../tools.js';

/* Reactstrap improts */
import {    Button, Col,
            Dropdown, DropdownMenu, DropdownToggle,
            InputGroup, Input } from 'reactstrap';

const FlightCalendar = ({calDateSelect, day, month, year, setMonth}) => {
    //  Variables
    const monthNames = ['January','February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['mon','tue','wed','thu','fri','sat','sun'];

    //  Get nr of days for current month, 
    //  --> year & month should just be numbers
    const nrDays = () => {
        return date().daysInMonth(year, month-1);
    }

    const generated = () => {
        const fillStart = dayNames.indexOf(date().firstDayOfMonth(year,month-1,day))+1;
        let arr = [];

        //  Push fillStarts
        for(let i = 0; i < fillStart; i++){
            arr.push(
                <div className="embed-responsive embed-responsive-1by1">
                    <div className="embed-responsive-item border border-0"></div>
                </div>
            )
        }

        //  Push real days
        for(let i = 0; i < nrDays(); i++){
            arr.push(
                <div className="embed-responsive embed-responsive-1by1" onClick={(e)=>{calDateSelect(e,[i+1, month, year])}}>
                    
                        <div className="embed-responsive-item btn btn-outline-success d-flex justify-content-center align-items-center">{i+1}</div>
                    
                </div>
            )
        }

        const fillEnd = (arr.length > 35 && arr.length < 42) ? 42-arr.length : 35-arr.length;

        for(let i = 0; i<(fillEnd); i++){
            arr.push(
                <div className="embed-responsive embed-responsive-1by1">
                    <div className="embed-responsive-item border border-0"></div>
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
                    <div className="row" key={`calender_row_${index}`}>
                        <div className="col d-flex flex-row border-bottom border-secondary">
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
                (month-1 > 0) && setMonth(month-1);
                break;
            case 'next':
                (month+1 < 12) && setMonth(month+1);
                break;
        }
    }

    return (
        <div className="container">
            {/* Day names */}
            <div className="row">
                <div className="col text-center d-flex flex-row justify-content-around align-items-center m-1">
                    <a href="#" name="prev" style={{fontSize:"3rem"}} onClick={(e)=>{monthChange(e)}}>&larr;</a>
                    <h5 className="mr-3 ml-3">{monthNames[month - 1]}</h5>
                    <a href="#" name="next" style={{fontSize:"3rem"}} onClick={(e)=>{monthChange(e)}}>&rarr;</a>
                </div>
            </div>

            {/* Day names */}
            <div className="row">
                <div className="col d-flex flex-row justify-content-around">
                    {
                        dayNames.map((name,index)=>{
                            return (
                                <div className="col text-center pb-2" key={`day_name_${name+index}`}>{name}</div>
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

export default FlightCalendar;