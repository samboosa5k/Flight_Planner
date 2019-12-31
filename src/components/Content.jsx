import React, {Suspense, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

/* 
    Global variable imports
*/
import { flightParameters, FlightContext, flightParamReducer } from '../flightContext.jsx';
import {date} from '../dateInfo.js';

/* 
    Reactstrap imports
*/
import { Container } from 'reactstrap';

/* 
    Component imports: Content
*/
const HomeSearch = React.lazy(()=> import('./views/HomeSearch.jsx'));

/* 
    Switch - show a different view based on incoming props from 'index.js'
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
            target: 'departureDate',
            payload: date().todayFormatted
        });
        
        dispatch({
            target: 'returnDate',
            payload: date().todayFormatted
        });        
    },[]);

    return(
        <FlightContext.Provider value={{state, dispatch}}>
            <main className="content my-4">
                <Container fluid="md">
                    <Suspense fallback={<p>Loading page content...</p>}>
                        <ContentSwitch pageContent={pageContent}/>
                    </Suspense>
                </Container>
            </main>
        </FlightContext.Provider>
    )
}

Content.propTypes = {
    pageContent: PropTypes.string.isRequired,
}

export default Content;