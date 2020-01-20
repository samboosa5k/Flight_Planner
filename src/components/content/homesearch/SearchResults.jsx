import React, { Suspense } from 'react';

/* 
    Reactstrap imports
*/
import { Container } from 'reactstrap';

/*
    Component imports: SearchResults
    - ResultsList.jsx
*/
import ResultsList from './searchresults/ResultsList.jsx';

/* 
    queryString

    - This is being passed down as a router-prop
    - It comes from the url, which is appended in FlightSearchSubmit.jsx
    - It is a double failsafe, in case somebody wants to save the url of their search results
*/

//  Results section on 'HomeSearch' view (conditional)
const SearchResults = ({queryString}) => {

    return (
        <>
            <Container className="searchresults-container mb-3 border-0">

                    <ResultsList />

            </Container>
        </>
    )
}

export default SearchResults;