import React, { useContext} from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../../flightContext.jsx';

/* General Imports */
import {date} from '../../../../tools.js';

/* Reactstrap imports */
import { Button } from 'reactstrap';

/* Component imports: Icon */
import {IconTag, IconWatch} from '../../../general/Icons.jsx';


const FlightSearchSort = ({doFetch}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);

    //  departureSort will sort the flightsFound context because api doesn't support this
    //  possible to combine with handleSort for more optimization
    const handleSort = (e) => {
        e.preventDefault(e);

        const target = 'flightsFound';
        const paramTarget = e.target.name;

        let tempContext = state[2]['flightsFound'];
        tempContext.sort((a,b)=>{
            return a[paramTarget] - b[paramTarget];
        });

        dispatch({
            target: target,
            payload: tempContext
        });
    }
 
    //  handleSort will do a new fetch because the api supports this
    const otherSort = (e) => {
        e.preventDefault();

        const target = 'flightParameters';
        const paramTarget = e.target.parentElement.id;
        const paramValue = e.target.name;

        const tempContext = state[0].flightParameters;
        tempContext[paramTarget] = paramValue;
        
        dispatch({
            target: target,
            payload: tempContext
        });

        doFetch();
    }

    return(
        <div id="sort" className="float-right">
            <span>Sort: </span>
            <Button name="dTime" onClick={(e)=>{handleSort(e)}} outline color="primary" style={{borderRadius:"1.5rem"}} >
                <IconTag color="primary" size="18"/> Departure
            </Button>
            <Button name="price" onClick={(e)=>{handleSort(e)}} outline color="primary" style={{borderRadius:"1.5rem"}} >
                <IconTag color="primary" size="18"/> Price
            </Button>
            <Button name="duration" onClick={(e)=>{otherSort(e)}} outline color="primary" style={{borderRadius:"1.5rem"}} >
                <IconWatch color="primary" size="18"/> Flight duration
            </Button>
        </div>
    )
};

export default FlightSearchSort;