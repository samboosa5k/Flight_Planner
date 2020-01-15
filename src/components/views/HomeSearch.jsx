import React, { Suspense, useContext } from 'react';
import PropTypes from 'prop-types';

/* 
    Context imports
*/
import {FlightContext} from '../../flightContext.jsx';

/*
    Component imports: HomeSearch 'view'
    - SearchForm.jsx
    - SearchResults.jsx
*/
const SearchForm = React.lazy( () => import( '../content/homesearch/SearchForm.jsx' ) );
const SearchResults = React.lazy( () => import( '../content/homesearch/SearchResults.jsx' ) );


//  Note:   Clean loading of 'view' components
const HomeSearch = ({queryString}) => {
    const {state} = useContext(FlightContext);

    return (
        <>
            <Suspense fallback={<p>Loading flight search form...</p>}>
                <SearchForm/>
            </Suspense>

            {
                state[2].flightsFound.length > 0 &&
                <Suspense fallback={<p>Loading flight search results...</p>}>
                <SearchResults/>
                </Suspense>
            }
        </>
    )
}

HomeSearch.propTypes = {
    queryString: PropTypes.string
}

export default HomeSearch;