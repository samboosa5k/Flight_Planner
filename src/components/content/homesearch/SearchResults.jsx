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

    //  Failsafe, for if somebody saves the url but doesn't actually do a new search
    const fetchUrl = () => {
        const contextUrl = state.find((obj) => obj.key === 'built_fetch_url').value;
        const routeUrl = urls().kiwiBase + queryString;
        if(contextUrl !== ''){
            return contextUrl;
        } else {
            return routeUrl;
        }
    }

    const doFetch = () => {
        fetch(fetchUrl())
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
        setCurrentSearch(queryString);
        doFetch();
    },[]);
    
    // On update, do the fetch - again
    useEffect(()=>{
        if (queryString !== currentSearch){
            setCurrentSearch(queryString);
            doFetch();
        }
    });

    return (
        <>
            <Container className="searchresults-container mb-3">
                
                <Card className="searchresults">
                    <CardBody className="p-3">
                        <Suspense fallback={<p>Loading flight search results...</p>}>
                            <ResultsList flightsFound={flightsFound}/>
                        </Suspense>
                    </CardBody>
                </Card>

            </Container>
        </>
    )
}

export default SearchResults;