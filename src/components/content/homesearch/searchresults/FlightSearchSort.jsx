import React, { useContext} from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../../flightContext.jsx';

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
            <span>Sort by: </span>
            <Button name="dTime" outline color="primary" className="ml-lg-3 ml-md-2" style={{borderRadius:"1.5rem"}} onClick={(e)=>{handleSort(e)}}>
                <IconTag color="primary" size="18"/> Departure
            </Button>
            <Button name="price" outline color="primary" className="ml-lg-3 ml-md-2" style={{borderRadius:"1.5rem"}} onClick={(e)=>{handleSort(e)}}>
                <IconTag color="primary" size="18"/> Price
            </Button>
            {/* <Button name="duration" outline color="primary" className="ml-lg-3 ml-md-2" style={{borderRadius:"1.5rem"}} onClick={(e)=>{otherSort(e)}} >
                <IconWatch color="primary" size="18"/> Duration
            </Button> */}
        </div>
    )
};

export default FlightSearchSort;