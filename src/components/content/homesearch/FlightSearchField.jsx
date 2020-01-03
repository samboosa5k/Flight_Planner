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
        //  Conditional dynamic importing of alphabetical named airport json lists
        let db = {};
            
        const test = () => {
            if (inputQuery.length > 2) {
                db = require(`../../../db_IATA/${inputQuery[0].toUpperCase()}_airports.json`);
                return db;
            } else {
                return 'No db imported yet';
            }
        }
        
        console.log('Current db: ', test());

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