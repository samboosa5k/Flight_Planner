import React, { useState, Suspense, useContext } from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../flightContext.jsx';

/* 
    General imports
*/
import {urls} from '../../../locations.js';
import {urlBuilder} from '../../../tools.js';

/* 
    Reactstrap imports
*/
import { Container, Jumbotron, Card, CardBody } from 'reactstrap';

/*
    Component imports: SearchForm
    # Lazy loading should be converted to traditional import for lots of small things
    - Toggles
    - Search fields
    - Submit functionality
*/
import FlightSearchSort from './searchform/FlightSearchSort.jsx';

const FlightDetailToggles = React.lazy( () => import( './searchform/FlightDetailToggles.jsx' ) );
const FlightSearchForm = React.lazy( () => import( './searchform/FlightSearchForm.jsx' ) );
const FlightSearchSubmit = React.lazy( () => import( './searchform/FlightSearchSubmit.jsx' ) );



//  Search section on 'HomeSearch' view
const SearchForm = () => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - manage which fields are inactive based on other toggles
    const [ignores, setIgnores] = useState(['return_from']);
    const [hasSearched, setHasSearched] = useState(false);

    //  Get the url-parameters for the fetching
    const urlParams = Object.entries(state[0].flightParameters).filter(arr => {
        if(ignores.includes(arr[0]) === false) return arr;
    });
    
    //  Build the fetch-URL
    const builtFetchUrl = urlBuilder().construct(
        urls().kiwiBase,
        urlParams
    );

    //  Handle the api-fetching
    const doFetch = () => {
        setHasSearched('true');

        fetch(builtFetchUrl)
            .then(kiwiResponse => {
                if(kiwiResponse.ok){
                    return kiwiResponse.json();
                } else {
                    return Promise.reject(kiwiResponse.status)
                }
            })
            .then(kiwiData => {
                const {data} = kiwiData;
                //  Send data to context
                dispatch({
                    target: 'flightsFound',
                    payload: data
                }) 
            })
            .catch(error => console.log('FlightSearchSubmit.jsx error: ', error));
    }

    return (
        <>
            <Container className="searchform-container mb-3">
                
                <Jumbotron fluid className="pb-0 mb-0" style={{backgroundColor:"rgba(224,249,249, 0.4)"}}>
                    <h1 className="display-3 text-center">Flights</h1>
                </Jumbotron>
                
                <Card className="searchform">
                    <CardBody className="p-3">
                        <Suspense fallback={<p>Loading flight search form...</p>}>
                            <FlightDetailToggles ignores={ignores} setIgnores={setIgnores}/>
                            <FlightSearchForm ignores={ignores}/>
                            <FlightSearchSubmit urlParams={urlParams} doFetch={doFetch}/>
                        </Suspense>
                    </CardBody>
                </Card>

                {/* Search-finetuning appears only once search has been made */}
                <Card className={`searchform-finetuning ${(hasSearched)?'block':'d-none'}`}>
                    <CardBody className="p-3">
                        <FlightSearchSort doFetch={doFetch}/>
                    </CardBody>
                </Card>
               

            </Container>
        </>
    )
}

export default SearchForm;