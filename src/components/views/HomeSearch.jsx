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
    //  Context
    const {state} = useContext(FlightContext);
    //  State - helps with loading new search results
    const [currentSearch, setCurrentSearch] = useState({});

    //  If a new search has been made,
    //  give a reason to show/refresh the search results
    const triggerResults = () => {

    }

    return (
        <div>
            <Suspense fallback={<p>Loading flight search form...</p>}>
                <SearchForm/>
            </Suspense>

            {
                state[2].flightsFound.length > 0 &&
                <Suspense fallback={<p>Loading flight search results...</p>}>
                    <SearchResults/>
                </Suspense>
            }
        </div>
    )
}

HomeSearch.propTypes = {
    queryString: PropTypes.string
}

export default HomeSearch;