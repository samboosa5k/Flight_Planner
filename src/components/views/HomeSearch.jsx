import React, { Suspense, useContext } from 'react';
import PropTypes from 'prop-types';

/*
    Component imports: HomeSearch 'view'
    - SearchForm.jsx
    - SearchResults.jsx
*/
const SearchForm = React.lazy( () => import( '../content/homesearch/SearchForm.jsx' ) );
const SearchResults = React.lazy( () => import( '../content/homesearch/SearchResults.jsx' ) );


//  Note:   Clean loading of 'view' components
const HomeSearch = ({queryString}) => {
    return (
        <>
            <Suspense fallback={<p>Loading flight search form...</p>}>
                <SearchForm/>
            </Suspense>
            {
            queryString && 
            <Suspense fallback={<p>Loading flight search results...</p>}>
                <SearchResults queryString={queryString}/>
            </Suspense>
            }
        </>
    )
}

HomeSearch.PropTypes = {
    queryString: PropTypes.string
}

export default HomeSearch;