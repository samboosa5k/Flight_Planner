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

    //  Important variables
    const contextUrl = state.find((obj) => obj.key === 'built_fetch_url').value;

    const doFetch = (inputUrl) => {
        fetch(inputUrl)
            .then(kiwiResponse => {
                if(kiwiResponse.ok){
                    return kiwiResponse.json();
                } else {
                    return Promise.reject(kiwiResponse.status)
                }
            })
            .then(kiwiData => {
                const {data} = kiwiData;
                setFlightsFound(data);
            })
            .catch(error => console.log('SearchResults.jsx fetch error: ', error));
    }

    // On mount, do the fetch
    useEffect(()=>{
        setCurrentSearch(contextUrl);
        doFetch(contextUrl);
    },[]);
    
    // On update, if the context-url changes, fetch again
    useEffect(()=>{
        if (contextUrl !== currentSearch){
            setCurrentSearch(contextUrl);
            doFetch(contextUrl);
        }
    });

    return (
        <>
            <Container className="searchresults-container mb-3">
                
                        <Suspense fallback={<p>Loading flight search results...</p>}>
                            <ResultsList flightsFound={flightsFound}/>
                        </Suspense>

            </Container>
        </>
    )
}

export default SearchResults;