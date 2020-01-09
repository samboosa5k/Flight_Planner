import React, {useContext, useState} from 'react';

/* 
    Global variable imports
*/
import {FlightContext} from '../../../flightContext.jsx';

/* 
    Reactstrap improts
*/
import { Dropdown, Input } from 'reactstrap';

/* 
    Component imports: 
*/
import SuggestionDropDown from './SuggestionDropDown.jsx';

const FlightSearchField = ({identifier, placeholder}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - Search query
    const [query, setQuery] = useState('');
    //  State - load alphabetical LOCATION database 
    const [iataDB, setIataDB] = useState([]);
    //  State - Suggestions (and dropdown)
    const [suggestions, setSuggestions] = useState([]);
    const [ddState, setddState] = useState(false);
 
    
    //  Handle airport suggestion filtering
    const handleSuggestions = (inputQuery) => {
        const suggestionsFiltered = iataDB.filter((obj)=>{
            return obj.location.startsWith(inputQuery);
        })

        console.log('suggestion status: ', suggestionsFiltered);
        
        //  Set suggestions state if any are found & are not too many
        //  If there are no suggestions, force clear the suggestions
        if(suggestionsFiltered.length > 0 && suggestionsFiltered.length <= 10){
            setSuggestions(suggestionsFiltered);
            setddState(true);
        } else {
            setSuggestions([]);
            setddState(false);
        }
    }
    

    //  Conditional importing of alphabetical named airport lists
    const handleDBLoad = (inputQuery) => {
        if(Object.keys(iataDB)[0] !== inputQuery[0].toUpperCase() || Object.keys(iataDB)[0] === undefined) {
            setIataDB(require(`../../../db_LOCATION/${inputQuery[0].toUpperCase()}_airports.json`));
        }
    }

    //  Handle query change
    const handleQueryChange = (inputQuery) => {
        setQuery(inputQuery);

        // Only get DB & suggestions if query is longer than x length
        if(inputQuery.length > 1) {
            handleDBLoad(inputQuery);
            handleSuggestions(inputQuery);
        } else {
            console.log('Query status: ','DB will import after 2 char query length');
        }
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
        <Dropdown isOpen={ddState} toggle={()=>{}}>
            
            <Input 
            type="text" 
            identifier={identifier} 
            placeholder={placeholder}
            value={query}
            onChange={(e)=>{handleQueryChange(e.target.value)}}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                handleSubmission(query);
                }
            }}
            />

            {
                ddState && 
                <SuggestionDropDown 
                isOpen={ddState}
                suggestions={suggestions} 
                identifier={identifier}/>
            }
                        
        </Dropdown>
    )
}

export default FlightSearchField;