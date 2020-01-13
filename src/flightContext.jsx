import React from 'react';

/*
    Context - init context and default state
    - Partner = picky, this is ESSENTIAL
*/
export const flightParameters = [ 
    {
        "key": "fly_from",
        "value": "AMS"
    },
    {
        "key": "fly_to",
        "value": "DUB"
    },
    {
        "key": "date_from",
        "value": "00/00/00"
    },
    {
        "key": "return_from",
        "value": "00/00/00"
    },
    {
        "key": "flight_type",
        "value": "oneway"
    },
    {
        "key": "adults",
        "value": "1"
    },
    {
        "key": "selected_cabins",
        "value": "M"
    },
    {
        "key": "limit",
        "value": "10"
    },
    {
        "key": "partner",
        "value": "picky"
    },
    {
        "key": "built_fetch_url",
        "value": ""
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