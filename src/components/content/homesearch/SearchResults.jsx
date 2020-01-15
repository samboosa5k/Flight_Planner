import React, { useState, useEffect, useContext, Suspense } from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../flightContext.jsx';

/* 
    General imports
*/
import {urls} from '../../../locations.js';
import { date } from '../../../tools.js';

/* 
    Reactstrap imports
*/
import { Container, Card, CardBody } from 'reactstrap';

/*
    Component imports: SearchResults
    - ResultsList.jsx
*/
const ResultsList = React.lazy(()=> import('./searchresults/ResultsList.jsx'));

/* 
    queryString

    - This is being passed down as a router-prop
    - It comes from the url, which is appended in FlightSearchSubmit.jsx
    - It is a double failsafe, in case somebody wants to save the url of their search results
*/

//  Results section on 'HomeSearch' view (conditional)
const SearchResults = ({queryString}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - determines when to update
    const [currentSearch, setCurrentSearch] = useState('');
    //  State - json data from the Kiwi fetch
    const [flightsFound, setFlightsFound] = useState([]);

    return (
        <>
            <Container className="searchresults-container mb-3">
                <Suspense fallback={<p>Loading flight search results...</p>}>
                    <ResultsList />
                </Suspense>
            </Container>
        </>
    )
}

export default SearchResults;