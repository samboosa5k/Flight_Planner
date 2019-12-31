import React, {useContext, useState} from 'react';

/* 
    Global variable imports
*/
import {FlightContext} from '../../../flightContext.jsx';
import {date} from '../../../dateInfo.js';

/* 
    Reactstrap improts
*/
import {    Button, Col,
            Dropdown, DropdownMenu, DropdownToggle,
            InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


const FlightDatePicker = ({label, identifier}) => {
    const {state, dispatch} = useContext(FlightContext);
    
    //  DATE MANAGEMENT
    //  * Init individual day/month/year
    //      - Used for constructing the date
    const [day, setDay] = useState(date().day);
    const [month, setMonth] = useState(date().month);
    const [year, setYear] = useState(date().year);

    //  * Get the actual date which was initializd to context in Content.jsx
    const contextDate = () => {
        const dateObject = state.find((obj)=>{
            if (obj.key === identifier) return obj;
        })
        return dateObject.value;
    }
    
    //  * Output the date to the format stored in context
    const outputDate = date().formatted(day, month, year);
    
    //  * Submit date to context - specific to identifier prop
    const submitDate = () => {
        dispatch({
            target: identifier,
            payload: outputDate
        })
    }

    //  Handle the dropdown toggling
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} /* className="w-50" */>
            
            <DropdownToggle color="light" caret className="w-100">
                <span className="text-dark">{label}: </span><span className="text-success">{contextDate()}</span>
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