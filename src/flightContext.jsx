import React from 'react';

/*
    Context - init context and default state
*/
export const flightParameters = [ 
    {
        "key": "returnOrSingle",
        "value": "Single"
    },
    {
        "key": "numPassengers",
        "value": "1"
    },
    {
        "key": "class",
        "value": "Economy"
    },
    {
        "key": "departureDate",
        "value": "00-00-00"
    },
    {
        "key": "returnDate",
        "value": "00-00-00"
    },
    {
        "key": "origin",
        "value": "Amsterdam"
    },
    {
        "key": "destination",
        "value": "Dublin"
    }
];


/* 
    Reducer - modify individual state-hook values without re-rendering everything
*/
export const flightParamReducer = ( state, action ) => {
    return state.map( param => {
        if ( param.key === action.target ) {
            if ( param.value !== action.payload ) {
                param.value = action.payload;
            }
        } return param;// Am i forgetting a return here?
    }  )
}


/*
    Context - init context and default state/dispatch object
*/
export const FlightContext = React.createContext( {
    state: [],
    dispatch: null
} );