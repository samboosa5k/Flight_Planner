import React, {useContext, useState} from 'react';

/* 
    Global variable imports
*/
import {FlightContext} from '../../../flightContext.jsx';

/* 
    Reactstrap improts
*/
import { Input } from 'reactstrap';


const FlightSearchField = ({identifier, placeholder}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - current loaded IATA db & search query
    const [currentQuery, setCurrentQuery] = useState('');
    const [iataDB, setIataDB] = useState({});
 
    //  * Update search query to context when typing
    const setQuery = (inputQuery) => {
        setCurrentQuery(inputQuery);
    }

    //  Conditional importing of alphabetical named airport lists
    /* 
        - Problem: Json files are named based on IATA code, so if someone searches
        for an airport location starting with 'Bah', but IATA code of desired airport starts with 'Xxx',
        the airport will not be found...
    */
    const loadDBCondition = (inputQuery) => {
        if (inputQuery.length > 2) {
            if(Object.keys(iataDB)[0] !== inputQuery[0].toUpperCase() || Object.keys(iataDB)[0] === undefined) {
                setIataDB(require(`../../../db_IATA/${inputQuery[0].toUpperCase()}_airports.json`));
                console.log('Load DB status','New DB loaded');
            } else {
                console.log('Load DB status','No need to load another DB');
            }
        } else {
            console.log('Load DB status','DB will import after > 2 char query length');
        }
    }

    //  Handle query change
    const handleQueryChange = (inputQuery) => {
        setQuery(inputQuery);
        loadDBCondition(inputQuery);
    }

    //  Handle submission:
    const handleSubmission = (query) => {
        const iata = iataDB.find((q)=>{
            return q.location.includes(query) === true;
        });

        console.log(iata);

        /* 
        dispatch({
                    target: identifier,
                    payload: iata
                }) 
        */
    }
    
    return (
        <Input 
        type="text" 
        identifier={identifier} 
        placeholder={placeholder}
        onChange={(e)=>{handleQueryChange(e.target.value)}}
        onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmission(currentQuery);
            }
          }}
        />
    )
}

export default FlightSearchField;