import React, {useContext, useEffect, useState} from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../../flightContext.jsx';

/* 
    General imports
*/
import {date} from '../../../../tools.js';

/* 
    Reactstrap improts
*/
import {    Button, Col,
            Dropdown, DropdownMenu, DropdownToggle,
            InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


const FlightDatePicker = ({label, identifier, ignores}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - Date, individually set day/month/year
    const [day, setDay] = useState(date().day);
    const [month, setMonth] = useState(date().month);
    const [year, setYear] = useState(date().year);
    
    //  On mount, set context date
    useEffect(()=>{
        dispatch({
            target: identifier,
            payload: date().todayFormatted
        });       
    },[]);
  
    //  Format the date for display & to dispatch to context
    const outputDate = date().formatted(day, month, year);
    
    //  Submit date to context - specific to identifier prop
    const submitDate = () => {
        const target = 'flightParameters';

        //  Dirty/clean solution: (See FlightDetailToggles.jsx for better explanation)
        const tempContext = state[0].flightParameters;
        tempContext[identifier] = outputDate;

        dispatch({
            target: target,
            payload: tempContext
        })
    }

    //  Handle the dropdown toggling
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => {if (ignores.includes(identifier) === false) setDropdownOpen(prevState => !prevState)};

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            
            <DropdownToggle color="light" caret className="w-100">
                <span className="text-dark">{label}: </span><span className="text-success">{outputDate}</span>
            </DropdownToggle>
            
            <DropdownMenu className="p-0 m-0">
                    
                <InputGroup>
                    <InputGroupAddon addonType="prepend" style={{width:"33%"}}>
                        <InputGroupText className="w-100">
                        Day
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                        placeholder={day} 
                        value={day} 
                        min={1} max={31} type="number" step="1" 
                        onChange={(e)=>{setDay(e.target.value)}}
                    />
                </InputGroup>
                
                <InputGroup>
                    <InputGroupAddon addonType="prepend" style={{width:"33%"}}>
                        <InputGroupText className="w-100">
                        Month
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                        placeholder={month} 
                        value={month} 
                        min={1} max={12} type="number" step="1" 
                        onChange={(e)=>{setMonth(e.target.value)}}
                    />
                </InputGroup>
                
                <InputGroup>
                    <InputGroupAddon addonType="prepend" style={{width:"33%"}}>
                        <InputGroupText className="w-100">
                        Year
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                        placeholder={year} 
                        value={year} 
                        min={2019} max={2050} type="number" step="1" 
                        onChange={(e)=>{setYear(e.target.value)}}
                    />
                </InputGroup>
                
                <Col className="text-center">
                    <Button color="primary" size="md"
                        onClick={()=>{submitDate()}}
                    >Ready</Button>
                </Col>
            </DropdownMenu>
        </Dropdown>
    )
}

export default FlightDatePicker;