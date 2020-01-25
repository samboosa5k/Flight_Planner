import React, { useState, useContext } from 'react';

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
import ResultsPagination from './searchresults/ResultsPagination.jsx';

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
    //  State
    const [pageNr, setPageNr] = useState(1);
    
    //  Variables
    const perPage = 10;
    const totalFlights = state[2].flightsFound.length;

    return (
        <>
            <Container className="searchresults-container pl-0 pr-0 mb-3 border-0">

                {/* Search-finetuning appears only once search has been made */}
                {
                    ( newSearch && totalFlights > 1 ) &&
                    <FlightSearchSort/>
                }

                    <ResultsList newSearch={newSearch} perPage={perPage} pageNr={pageNr}/>

                {/* Pagination appears only if nr of flightsfound is larger than perPage */}
                {
                    ( newSearch && totalFlights > perPage ) &&
                    <ResultsPagination totalFlights={totalFlights} perPage={perPage} setPageNr={setPageNr}/>
                }

            </Container>
        </>
    )
}

export default SearchResults;