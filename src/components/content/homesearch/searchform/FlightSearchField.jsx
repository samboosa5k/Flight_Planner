import React, { useContext, useState } from 'react';

/* 
    Context imports
*/
import { FlightContext } from '../../../../flightContext.jsx';

/* 
    Reactstrap improts
*/
import { Dropdown, Input } from 'reactstrap';

/* 
    Component imports: 
*/
import SuggestionDropDown from './SuggestionDropDown.jsx';


const FlightSearchField = ( { identifier, placeholder } ) => {
    //  Context
    const { state, dispatch } = useContext( FlightContext );
    //  State - Search query
    const [query, setQuery] = useState( '' );
    //  State - load alphabetical LOCATION database 
    const [iataDB, setIataDB] = useState( [] );
    //  State - Suggestions (and dropdown)
    const [suggestions, setSuggestions] = useState( [] );
    const [dropState, setDropState] = useState( false );


    //  Handle airport suggestion filtering
    const handleSuggestions = ( capQuery ) => {
        const suggestionsFiltered = iataDB.filter( ( obj ) => {
            return obj.location.startsWith( capQuery );
        } )

        //  Set suggestions state if any are found & are not too many
        //  If there are no suggestions, force clear the suggestions
        if ( suggestionsFiltered.length > 0 && suggestionsFiltered.length <= 10 )
        {
            setSuggestions( suggestionsFiltered );
            setDropState( true );
        } else
        {
            setSuggestions( [] );
            setDropState( false );
        }
    }

    //  Conditional importing of alphabetical named airport lists
    const handleDBLoad = ( inputQuery ) => {
        if ( Object.keys( iataDB )[0] !== inputQuery[0].toUpperCase() || Object.keys( iataDB )[0] === undefined )
        {
            setIataDB( require( `../../../../db_LOCATION/${inputQuery[0].toUpperCase()}_airports.json` ) );
        }
    }

    //  Handle query change = load DB & generate suggestions
    const handleQueryChange = ( inputQuery ) => {     
        const capQuery = inputQuery[0].toUpperCase() + inputQuery.slice(1);
        
        setQuery( inputQuery );
        // Only get DB & suggestions if typing
        if ( inputQuery.length > 1 ) {
            handleDBLoad( inputQuery );
            handleSuggestions( capQuery );
        } else {
            console.log( 'Query status: ', 'DB will import after 2 char query length' );
        };
    }

    const handleSelection = (airportName, suggIndex) => {
        const target = 'flightParameters';
        const iata = suggestions[suggIndex]['key'];

        //  Dirty/clean solution: (See FlightDetailToggles.jsx for better explanation)
        const tempContext = state[0].flightParameters;
        tempContext[identifier] = iata;

        //  Update State for search field / dropdown
        setQuery(airportName);
        setDropState( false );

        // Dispatch to context
        dispatch({
            target: target,
            payload: tempContext
        })
    }

    return (
        <Dropdown isOpen={dropState} toggle={() => { }}>

            <Input
                type="text"
                style={{padding:"1.5rem 1rem 1.5rem 1rem", border:"1px solid rgba(0, 0, 0, 0.125)"}}
                identifier={identifier}
                placeholder={placeholder}
                value={query}
                onChange={( e ) => { handleQueryChange( e.target.value ) }}
                onKeyPress={( e ) => { 
                    if(e.key === 'Enter'){
                        handleSelection( suggestions[0].airport, 0 );
                    }
                }}
            />

            {
                dropState &&
                <SuggestionDropDown
                    isOpen={dropState}
                    suggestions={suggestions}
                    handleSelection={handleSelection}
                    identifier={identifier} />
            }

        </Dropdown>
    )
}

export default FlightSearchField;