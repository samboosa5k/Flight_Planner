import React, {useState, useContext} from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../../flightContext.jsx';

/* 
    Reactstrap imports
*/
import { Nav, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const FlightDetailToggles = () => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - specific to what is displayed in the toggles
    const [flightType, setFlightType] = useState('Single');
    const [passengers, setPassengers] = useState('1');
    const [selectedCabins, setSelectedCabins] = useState('Economy');
    // State - specify which dropdown is open
    const [dropdownOpen, setDropdownOpen] = useState( 'none' );
    
    //  Handle opening/closing dropdowns, only 1 function needed
    const toggle = ( specify ) => {
        if ( dropdownOpen === specify ) {
            setDropdownOpen( 'none' );
        } else {
            setDropdownOpen( specify )
        }
    };
    
    //  Handle the changing of the detail toggles
    const onToggleChange = (e) => {
        e.preventDefault();

        let target = e.target.parentElement.id;
        let chosen = e.target.textContent;
        let payload = undefined;

        //  Switch necessary to update State values (what user sees), and Context, what is used for the URL->API
        switch(target){
            case 'flight_type':
                setFlightType(chosen);
                if(chosen === 'Single') {
                    payload = 'oneway';
                }
                if(chosen === 'Return') {
                    payload = 'round';
                }
                break;
            
            case 'adults':
                setPassengers(chosen);
                payload = chosen;
                break;
            
            case 'selected_cabins':
                setSelectedCabins(chosen);
                if(chosen === 'Economy') payload = 'M';
                if(chosen === 'Business') payload = 'C';
                if(chosen === 'First') payload = 'F';
                break;
        }

        dispatch({
            target: target,
            payload: payload
        });
    }

    return(
    <Nav>
        <Dropdown nav isOpen={dropdownOpen === 'flight_type'} toggle={() => toggle( 'flight_type' )}>
            <DropdownToggle nav caret>
            <span className="text-secondary">Type:</span> {flightType}
            </DropdownToggle>
            <DropdownMenu id="flight_type" >
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>Return</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>Single</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown nav isOpen={dropdownOpen === 'adults'} toggle={() => toggle( 'adults' )}>
            <DropdownToggle nav caret>
                    <span className="text-secondary">Passengers</span> <Badge className="p-2 badge-success">{passengers}</Badge>
            </DropdownToggle>
            <DropdownMenu id="adults">
                <DropdownItem onClick={(e)=>{onToggleChange(e)}}>1</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>onToggleChange(e)}>2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>onToggleChange(e)}>3</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e)=>onToggleChange(e)}>4</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown nav isOpen={dropdownOpen === 'selected_cabins'} toggle={() => toggle( 'selected_cabins' )}>
            <DropdownToggle nav caret>
                    <span className="text-secondary">Class:</span> {selectedCabins}
            </DropdownToggle>
            <DropdownMenu id="selected_cabins">
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

export default FlightDetailToggles;