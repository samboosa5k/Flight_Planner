import React, {useContext, useEffect, useState} from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../../flightContext.jsx';

/* 
    General imports
*/
import {date} from '../../../../tools.js';

/* Reactstrap improts */
import {    Button, Col,
            Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

/* Component imports: Calendar */
import FlightCalendar from './FlightCalendar.jsx';


const FlightDatePicker = ({label, identifier, ignores}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - Date, individually set day/month/year
    const [day, setDay] = useState(parseInt(date().day));
    const [month, setMonth] = useState(parseInt(date().month));
    const [year, setYear] = useState(parseInt(date().year));
    //  State - toggle dropdown open/closed
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    //  On mount, set context date
    useEffect(()=>{
        dispatch({
            target: identifier,
            payload: date().todayFormatted
        });       
    },[]);
  
    //  Format the date for display & to dispatch to context
    const outputDate = date().formatted(day, month, year);
    
    //  calendar immediate select
    const calDateSelect = ( e, dateArray ) => {
        e.preventDefault();
        setDay( dateArray[0] );
        setMonth( dateArray[1] );
        setYear( dateArray[2] );

        const target = 'flightParameters';

        //  Dirty/clean solution: (See FlightDetailToggles.jsx for better explanation)
        const tempContext = state[0].flightParameters;
        tempContext[identifier] = outputDate;

        //  Close the calendar when submitted
        setDropdownOpen( prevState => !prevState );

        dispatch( {
            target: target,
            payload: tempContext
        } )
    }

    //  Handle the dropdown toggling
    const toggle = () => {if (ignores.includes(identifier) === false) setDropdownOpen(prevState => !prevState)};

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            
            <DropdownToggle color="white" caret tag="div"
                className="w-100 form-control d-flex align-items-center justify-content-center" 
                style={{padding:"1.5rem 1rem 1.5rem 1rem", border:"1px solid rgba(0, 0, 0, 0.125)"}}>
                <span className="text-dark d-none d-lg-inline mr-3">{label}:</span><span className="text-success">{outputDate}</span>
            </DropdownToggle>
            
            <DropdownMenu className="shadow p-0 m-0">
                    
                <FlightCalendar 
                    calDateSelect={calDateSelect}
                    day={day}
                    month={month}
                    year={year}
                    setMonth={setMonth}
                />
                
                {/* <Col className="text-center">
                    <Button color="primary" size="md" onClick={()=>{submitDate()}}>Ready</Button>
                </Col> */}
            </DropdownMenu>
        </Dropdown>
    )
}

export default FlightDatePicker;