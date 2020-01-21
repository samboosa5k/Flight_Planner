import React, { useState, useContext, Suspense } from 'react';
import PropTypes from 'prop-types';

/*
    Compnewnt imports: HomeSearch 'view'
    - SearchForm.jsx
    - SearchResults.jsx
*/
const SearchForm = React.lazy( () => import( '../content/homesearch/SearchForm.jsx' ) );
const SearchResults = React.lazy( () => import( '../content/homesearch/SearchResults.jsx' ) );


//  Note:   Clean loading of 'view' compnewnts
const HomeSearch = ({queryString}) => {
    //  State - helps with loading new search results
    const [currentSearch, setCurrentSearch] = useState([]);
    const [newSearch, setNewSearch] = useState();

    //  If a new search has been made,
    //  give a reason to show/refresh the search results
    const isNewSearch = (urlParams) => {
        const incoming = [].concat(...urlParams);
        const current = [].concat(...currentSearch);
        let counter = 0;

        for(let i in incoming){
            if(incoming[i] === current[i]) counter += 1;
        }

        if(counter === incoming.length){
            setNewSearch(false);
            return false;
        } else {
            setCurrentSearch(urlParams);
            setNewSearch(true);
            return true;
        }
    };

    return (
        <div>
            <Suspense fallback={<p>Loading flight search form...</p>}>
                <SearchForm isNewSearch={isNewSearch}/>
            </Suspense>

            <Suspense fallback={<p>Loading flight search results...</p>}>
                <SearchResults newSearch={newSearch}/>
            </Suspense>
        </div>
    )
}

HomeSearch.propTypes = {
    queryString: PropTypes.string
}

export default HomeSearch;

