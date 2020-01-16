import React, {useState, useContext} from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../../flightContext.jsx';

/* 
    Reactstrap imports
*/
import { Nav, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const FlightDetailToggles = ({ignores, setIgnores}) => {
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

        const target = 'flightParameters';
        const chosen = e.target.textContent;
        const paramTarget = e.target.parentElement.id;
        const paramValue = e.target.name;

        //  Dirty/clean solution: replace the entire flightParameters object at once...
        //  ...the alternative was to do some next-level nested mapping in the reducer,
        //  which caused react to crash.
        //  At least at the top-most level, I'm not replacing the entire context.
        const tempContext = state[0].flightParameters;
        tempContext[paramTarget] = paramValue;

        //  Switch necessary to update State values (what user sees), and Context, what is used for the URL->API
        switch(paramTarget){
            case 'flight_type':
                setFlightType(chosen);
                if(chosen === 'Single'){
                    if(ignores.includes('return_from') === false){
                        setIgnores([...ignores, 'return_from']);
                    }
                } else {
                    if(ignores.includes(paramValue) === true){
                        let tempIgnores = ignores;
                        tempIgnores.splice(tempIgnores.indexOf('return_from'), 1);
                        setIgnores(tempIgnores);
                    }
                }
                break;
            
            case 'adults':
                setPassengers(chosen);
                break;
            
            case 'selected_cabins':
                setSelectedCabins(chosen);
                break;
        }

        dispatch({
            target: target,
            payload: tempContext
        });
    }

    return(
    <Nav>
        <Dropdown nav isOpen={dropdownOpen === 'flight_type'} toggle={() => toggle( 'flight_type' )}>
            <DropdownToggle nav caret>
            <span className="text-secondary">Type:</span> {flightType}
            </DropdownToggle>
            <DropdownMenu id="flight_type" >
                <DropdownItem name="round" onClick={(e)=>{onToggleChange(e)}}>Return</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="oneway" onClick={(e)=>{onToggleChange(e)}}>Single</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown nav isOpen={dropdownOpen === 'adults'} toggle={() => toggle( 'adults' )}>
            <DropdownToggle nav caret>
                    <span className="text-secondary">Passengers</span> <Badge className="p-2 badge-success">{passengers}</Badge>
            </DropdownToggle>
            <DropdownMenu id="adults">
                <DropdownItem name="1" onClick={(e)=>{onToggleChange(e)}}>1</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="2" onClick={(e)=>onToggleChange(e)}>2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="3" onClick={(e)=>onToggleChange(e)}>3</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="4" onClick={(e)=>onToggleChange(e)}>4</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown nav isOpen={dropdownOpen === 'selected_cabins'} toggle={() => toggle( 'selected_cabins' )}>
            <DropdownToggle nav caret>
                    <span className="text-secondary">Class:</span> {selectedCabins}
            </DropdownToggle>
            <DropdownMenu id="selected_cabins">
                <DropdownItem name="M" onClick={(e)=>{onToggleChange(e)}}>Economy</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="C" onClick={(e)=>{onToggleChange(e)}}>Business</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="F" onClick={(e)=>{onToggleChange(e)}}>First</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Nav>
    )
};

export default FlightDetailToggles;