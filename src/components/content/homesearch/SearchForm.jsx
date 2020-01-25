import React, { useState, Suspense, useContext } from 'react';

/* Context imports */
import {FlightContext} from '../../../flightContext.jsx';

/* General imports */
import {urls} from '../../../locations.js';
import {urlBuilder} from '../../../tools.js';

/* Reactstrap imports */
import { Container, Jumbotron, Card, CardBody } from 'reactstrap';

/*
    Component imports: SearchForm
    # Lazy loading should be converted to traditional import for lots of small things
    - Toggles
    - Search fields
    - Submit functionality
*/
import FlightDetailToggles from './searchform/FlightDetailToggles.jsx';
import FlightSearchForm from './searchform/FlightSearchForm.jsx';
import FlightSearchSubmit from './searchform/FlightSearchSubmit.jsx';

/* Component imports: Graphics */
import {IconInfo} from '../../general/Icons.jsx';
import jumbotron from '../../../img/jumbotron.jpg';


//  Search section on 'HomeSearch' view
const SearchForm = ({isNewSearch}) => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);
    //  State - manage which fields are inactive based on other toggles
    const [ignores, setIgnores] = useState(['return_from']);

    //  Get the url-parameters for the fetching
    const urlParams = Object.entries(state[0].flightParameters).filter(arr => {
        if(ignores.includes(arr[0]) === false) return arr;
    });
    
    //  Build the fetch-URL
    const builtFetchUrl = urlBuilder().construct(
        urls().kiwiBase,
        urlParams
    );

    const reset = () => {
        const empty = [];

        dispatch({
            target: 'flightsFound',
            payload: empty
        })
    }

    //  Handle the api-fetching
    const doFetch = () => {
        reset();
       
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
                const filterNoSeats = data.filter((flight)=>{
                    return flight.availability.seats !== null;
                })
                //  Send data to context
                dispatch({
                    target: 'flightsFound',
                    payload: filterNoSeats
                }) 
            })
            .catch(error => console.log('FlightSearchSubmit.jsx error: ', error));
    }

    return (
        <>
            <Container className="searchform-container">
                
                <Jumbotron fluid className="pb-0 mb-0" style={{
                    backgroundImage:`linear-gradient(rgba(255,255,255,0.75),rgba(255,255,255,0.75)), 
                    url(${jumbotron})`, 
                    backgroundPosition:"center", 
                    backgroundSize:"cover", 
                    position:"relative"
                }}>
                    {/* Top-right info icon -> link to image source */}
                    <div className="pr-1" style={{position:"absolute", top:"0", right:"0"}}>
                        <a title="jumbotron image source" href="https://st.depositphotos.com/1006880/3467/i/950/depositphotos_34679649-stock-photo-modern-airport-terminal-interior.jpg" target="_blank" rel="noopener noreferrer">
                            <IconInfo color="black" size="20"/>
                        </a>
                    </div>
                    <h1 className="display-3 text-center m-0 pb-3">Flights</h1>
                </Jumbotron>
                
                <Card className="searchform mb-4 shadow">
                    <CardBody className="pt-3 pl-3 pr-3 pb-0">
                        <FlightDetailToggles ignores={ignores} setIgnores={setIgnores}/>
                        <FlightSearchForm ignores={ignores}/>
                        <FlightSearchSubmit urlParams={urlParams} doFetch={doFetch} isNewSearch={isNewSearch} />
                    </CardBody>
                </Card>

            </Container>
        </>
    )
}

export default SearchForm;