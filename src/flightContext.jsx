import React from 'react';

/*
    Context - init context and default state
    - Partner = picky, this is ESSENTIAL
*/
export const flightContextStore = [
    {
        flightParameters: {
            "fly_from": "AMS",
            "fly_to": "DUB",
            "date_from": "10/02/2020",
            "flight_type": "oneway",
            "adults": "1",
            "selected_cabins": "M",
            "limit": "10",
            "partner": "picky",
        }
    },
    {
        build_fetch_url: "",
    },
    {
        flightsFound: [],
    }
];


/* 
    Reducer - modify individual state-hook values without re-rendering everything
*/
export const flightContextReducer = ( state, action ) => {
    switch(action.target){
        case('flightsFound'):
            return state.map(obj => {
                if ('flightsFound' in obj) {
                    return {flightsFound: action.payload};
                } else {
                    return obj;
                }
            });
            break;
        case('flightParameters'):
            return state.map(obj => {
                if('flightParameters' in obj){
                    return {flightParameters: action.payload};
                } else {
                    return obj;
                }
            });
            break;
        default:
            console.log('Context reducer: ', 'No valid target provided');
            return state;
    }
}

/*
    Context - init context and default state/dispatch object
*/
export const FlightContext = React.createContext( {
    state: [],
    dispatch: null
} );