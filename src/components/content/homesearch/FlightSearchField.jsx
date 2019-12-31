import React, {useContext} from 'react';

/* 
    Global variable imports
*/
import {FlightContext} from '../../../flightContext.jsx';

/* 
    Reactstrap improts
*/
import { Input } from 'reactstrap';


const FlightSearchField = ({identifier, placeholder}) => {
    const {state, dispatch} = useContext(FlightContext);
 
    //  * Submit search query to context when typing
    const setQuery = (inputQuery) => {
        dispatch({
            target: identifier,
            payload: inputQuery
        })
    }
    
    return (
        <Input 
        type="text" 
        identifier={identifier} 
        placeholder={placeholder}
        onChange={(e)=>{setQuery(e.target.value)}}
        />
    )
}

export default FlightSearchField;