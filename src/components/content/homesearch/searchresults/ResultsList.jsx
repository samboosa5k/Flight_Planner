import React, {useContext} from 'react';

/* Context imports */
import {FlightContext} from '../../../../flightContext.jsx';

/* General Imports */
import {date} from '../../../../tools.js';

/* Reactstrap imports */
import { Spinner } from 'reactstrap';

/* Component imports: Graphics */
import square128 from '../../../../img/square128.jpg';

const ResultsList = ({newSearch, perPage, pageNr}) => {
    //  Context
    const { state } = useContext( FlightContext );

    //  Variables
    const airlines = require( `../../../../db_AIRLINES/iata_airlines.json` );
    const pageResults = state[2].flightsFound.filter((flight, index)=>{
        if(index >= pageNr*perPage && index <= (pageNr*perPage)+perPage){
            return flight;
        }
    })

    //  Get airline name from airline-iata code
    const getAirline = (iata) => {
        return airlines.find((elem) => {
            if(elem.key === iata) return elem;
        })
    }

    //  Logic for showing or refreshing results depending on if a new search is made
    //  the 'newSearch' value is measured in HomeSearch.jsx
    if(newSearch !== true && state[2].flightsFound.length < 1){
        return (
            <p className="text-center text-muted">Awaiting your search!</p>
        )
    } else if ( newSearch && state[2].flightsFound.length < 1 ) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner color="success"/>
            </div>
        )
    } else {
        return (
            <div className="container shadow mt-1 mb-1" style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}>

                    {
                        pageResults.map( ( flight, index ) => {
                            const airline = getAirline( flight.airlines[0]).airline;

                            return (
                                <div className={`d-flex flex-row justify-content-between pt-3 pb-3 ${(index>0)?'border-top':'border-0'}`} key={`flight_list_result_${index}`}>
                                    

                                    <div className="col-7 col-md-6 d-flex flex-row mr-2 pl-0">
                                        {/* Left 2: Airline logo*/}
                                        <div className="d-none d-sm-flex">
                                            <img src={square128} className="p-0" alt="airline_logo" style={{ maxWidth: "3rem", height: "auto" }} />
                                        </div>
                                        
                                        {/* Left 2: time, airlane name */}
                                        <div className="d-flex flex-column pl-sm-3 pl-md-3 text-left">
                                            <p className="font-weight-bold m-0">{date().timeFromUnix( flight.dTimeUTC )} - {date().timeFromUnix( flight.aTimeUTC )}</p>
                                            <p className="text-secondary m-0">{airline}</p>
                                        </div>
                                        
                                        {/* Center 1: Flight duration, iata code of origin->destination airport */}
                                        <div className="d-flex flex-column flex-grow-1 text-right">                                    
                                            <p className="m-0">{flight.fly_duration}</p>
                                            <p className="m-0 text-secondary">{flight.flyFrom} - {flight.flyTo}</p>
                                        </div>
                                    </div>

                                    <div className="col-5 col-md-6 d-flex flex-row justify-content-between align-items-center ml-2">
                                        {/* Center 2: Direct or with layovers */}
                                        <div className="d-flex flex-column text-left">
                                            <p className="m-0">{( flight.has_airport_change ) ? "With layovers" : "Direct"}</p>
                                        </div>
                                        
                                        {/* Right: Price and additional options */}
                                        <div className="d-flex justify-content-end text-right">
                                            <p className="m-0 text-success">&euro; {flight.price}</p>
                                        </div>
                                    </div>

                                    
                                </div>
                            )
                        } )
                    }

            </div>
        )
    } 
}

export default ResultsList;