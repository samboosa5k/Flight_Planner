import React, { useContext, useState } from 'react';

/* 
    Global variable imports
*/
import { FlightContext } from '../../../flightContext.jsx';

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
    //  State - Selected airport
    const [selectedAP, setSelectedAP] = useState( {} ); //  //  //  THIS NEEDS TO DISPATCH TO CONTEXT


    //  Handle airport suggestion filtering
    const handleSuggestions = ( inputQuery ) => {
        const suggestionsFiltered = iataDB.filter( ( obj ) => {
            return obj.location.startsWith( inputQuery );
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
            setIataDB( require( `../../../db_LOCATION/${inputQuery[0].toUpperCase()}_airports.json` ) );
        }
    }

    //  Handle query change from multiple sources/interactions:
    //  Typing is easiest
    //  When suggestions are available, selection is possible through Enter
    //  When dropdown is clicked on, selection is made precisely
    const handleQueryChange = ( input, type ) => {       
        let inputQuery = undefined;
        
        if(input.target !== undefined){
            inputQuery = input.target.value;
        } else {
            inputQuery = input.airport;
        }; 
        
        switch(type){
            case('txt'):
                setQuery( inputQuery );
                // Only get DB & suggestions if typing
                if ( inputQuery.length > 1 ) {
                    handleDBLoad( inputQuery );
                    handleSuggestions( inputQuery );
                } else {
                    console.log( 'Query status: ', 'DB will import after 2 char query length' );
                };
                break;
            case('kp'):
                // Set the chosen airport immediately with enter after typing
                if(input.key === 'Enter') {
                    handleSuggestions( inputQuery );
                    setQuery(suggestions[0].airport);
                    setSelectedAP(suggestions[0]);  //  //  //  THIS NEEDS TO DISPATCH TO CONTEXT
                    setDropState( false );
                }
                break;
            case ('btn'):
                // Set the chosen airport when selecting from the dropdown
                setQuery(inputQuery);
                setSelectedAP(input);   //  //  //  THIS NEEDS TO DISPATCH TO CONTEXT
                setDropState( false );
                break;
        }    
        
    }


    return (
        <Dropdown isOpen={dropState} toggle={() => { }}>

            <Input
                type="text"
                identifier={identifier}
                placeholder={placeholder}
                value={query}
                onChange={( e ) => { handleQueryChange( e, 'txt' ) }}
                onKeyPress={( e ) => { handleQueryChange( e, 'kp' ) }}
            />

            {
                dropState &&
                <SuggestionDropDown
                    isOpen={dropState}
                    suggestions={suggestions}
                    dropSelect={handleQueryChange}
                    identifier={identifier} />
            }

        </Dropdown>
    )
}

export default FlightSearchField;