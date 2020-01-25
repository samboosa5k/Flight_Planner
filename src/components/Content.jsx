import React, {useReducer} from 'react';
import PropTypes from 'prop-types';

/* 
    Context imports: SETUP
    - This is where it is setup/initialized and passed down
*/
import { flightContextStore, FlightContext, flightContextReducer } from '../flightContext.jsx';

/* 
    General imports
*/
import {routes as r} from '../locations.js';

/* 
    Reactstrap imports
*/
import { Container } from 'reactstrap';

/* 
    Component imports: Content
*/
import HomeSearch from './views/HomeSearch.jsx';

/* 
    Switch:
    - show a different 'view' based on incoming 'routeProps.location.pathname' from 'index.js'
    - easier than the react router switch
*/
const ContentSwitch = ( {page, search} ) => {
    switch(page){
        case (r().flights):
            if(search !== ''){
                return (<HomeSearch queryString={search}/>);
            } else {
                return (<HomeSearch/>);
            }
            break;
        case (r().specialOffers):
            return (
                <p>These are the special offers</p>
            );
            break;
        default:
            return (
                <HomeSearch />
            );
            break;
    }
}

//  Note:   rather than using the <main> tag with <Container> at the top level in 'index.js',
//          wrapping the content like below is neater & more efficient

const Content = ( { location }) => {
    //  Context - Here it all starts...
    const [state, dispatch] = useReducer(flightContextReducer, flightContextStore);

    //  Router props
    const page = location.pathname;
    const search = location.search;

    return(
        <FlightContext.Provider value={{state, dispatch}}>
                <main className="content m-0-xs my-md-4 my-lg-4 flex-grow-1">
                    <ContentSwitch page={page} search={search}/>
                </main>
        </FlightContext.Provider>
    )
}

Content.propTypes = {
    location: PropTypes.object.isRequired,
}

export default Content;