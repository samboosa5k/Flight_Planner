import React, { useContext } from 'react';

/* Context imports */
import {FlightContext} from '../../../flightContext.jsx';

/* Reactstrap imports */
import { Container } from 'reactstrap';

/*
    Component imports: SearchResults
    - ResultsList.jsx
*/
import ResultsList from './searchresults/ResultsList.jsx';
import FlightSearchSort from './searchresults/FlightSearchSort.jsx';

/* 
    queryString

    - This is being passed down as a router-prop
    - It comes from the url, which is appended in FlightSearchSubmit.jsx
    - It is a double failsafe, in case somebody wants to save the url of their search results
*/

//  Results section on 'HomeSearch' view (conditional)
const SearchResults = ({queryString, newSearch}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    return (
        <>
            <Container className="searchresults-container mb-3 border-0">

                {/* Search-finetuning appears only once search has been made */}
                {
                    ( newSearch && state[2].flightsFound.length > 1 ) &&
                    <FlightSearchSort/>
                }

                <ResultsList newSearch={newSearch}/>
            </Container>
        </>
    )
}

export default SearchResults;