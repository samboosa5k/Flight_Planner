import React, {Suspense, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

/* 
    Context imports: SETUP
    - This is where it is setup/initialized and passed down
*/
import { flightParameters, FlightContext, flightParamReducer } from '../flightContext.jsx';

/* 
    General imports
*/
import {date} from '../tools.js';

/* 
    Reactstrap imports
*/
import { Container } from 'reactstrap';

/* 
    Component imports: Content
*/
const HomeSearch = React.lazy(()=> import('./views/HomeSearch.jsx'));

/* 
    Switch:
    - show a different view based on incoming props from 'index.js'
    - each view will load a different set of components
        - if the components are unique to the 'view', they will come from
        the similarly named folder in /content/*view_name*

*/
const ContentSwitch = ( {pageContent} ) => {
    switch(pageContent){
        case '/':
            return (
                <HomeSearch />
            );
            break;
        case '/search':
            return (
                <p>This is the content {pageContent}</p>
            );
            break;
        case '/flight_details':
            return (
                <p>This is the content {pageContent}</p>
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

const Content = ( { pageContent }) => {
    const [state, dispatch] = useReducer(flightParamReducer, flightParameters);

    //  Init context date based on today
    //  - Init as high as possible
    useEffect(()=>{
        dispatch({
            target: 'date_from',
            payload: date().todayFormatted
        });
        
        dispatch({
            target: 'return_from',
            payload: date().todayFormatted
        });        
    },[]);

    return(
        <FlightContext.Provider value={{state, dispatch}}>
                <Container className="content my-4" fluid="md" tag="main">
                    <Suspense fallback={<p>Loading page content...</p>}>
                        <ContentSwitch pageContent={pageContent}/>
                    </Suspense>
                </Container>
        </FlightContext.Provider>
    )
}

Content.propTypes = {
    pageContent: PropTypes.string.isRequired,
}

export default Content;