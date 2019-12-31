import React, {useContext} from 'react';
import PropTypes from 'prop-types';

/* 
    Global variable imports
*/
import {FlightContext} from '../../../flightContext.jsx';

/* 
    Reactstrap imports
*/
import { Nav, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const FlightDetailToggles = ({dropdownOpen, toggle}) => {
    const {state, dispatch} = useContext(FlightContext);
    
    //  Handle the button toggling
    const onToggleChange = (e) => {
        e.preventDefault();
        
        //  Debugging context-state changes
        /* 
        console.log('state before dispatch', state); 
        */

        dispatch({
            target: e.target.parentElement.id,
            payload: e.target.textContent
        });

        /* 
        console.log('state after dispatch', state);
        */
    }

    return(
    <Nav>

        <Dropdown nav isOpen={dropdownOpen === 'returnOrSingle'} toggle={() => toggle( 'returnOrSingle' )}>
            <DropdownToggle nav caret>
            <span className="text-secondary">Type:</span> {state[0].value}
            </DropdownToggle>
            <DropdownMenu id="returnOrSingle" >
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>Return</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>Single</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown nav isOpen={dropdownOpen === 'numPassengers'} toggle={() => toggle( 'numPassengers' )}>
            <DropdownToggle nav caret>
                    <span className="text-secondary">Num. Passengers</span> <Badge className="p-2" color="success">{state[1].value}</Badge>
            </DropdownToggle>
            <DropdownMenu id="numPassengers">
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>1</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>onToggleChange(e)}>2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>onToggleChange(e)}>3</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>onToggleChange(e)}>4</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown nav isOpen={dropdownOpen === 'class'} toggle={() => toggle( 'class' )}>
            <DropdownToggle nav caret>
                    <span className="text-secondary">Class:</span> {state[2].value}
            </DropdownToggle>
            <DropdownMenu id="class">
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>Economy</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>Business</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>First</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Nav>
    )
};

FlightDetailToggles.propTypes = {
    dropdownOpen: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired
}

export default FlightDetailToggles;