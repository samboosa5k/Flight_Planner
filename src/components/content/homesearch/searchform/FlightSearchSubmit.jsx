import React, {useContext} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';

/* 
    Context imports
*/
import {FlightContext} from '../../../../flightContext.jsx';

/* 
    General imports
*/
import {routes as r, urls} from '../../../../locations.js';
import {urlBuilder} from '../../../../tools.js';

/* 
    Reactstrap imports
*/
import {Row, Col, Button, NavLink as RSNavLink} from 'reactstrap';

/*
    Component imports: Icon
*/
import {IconSearch} from '../../../general/Icons.jsx';


const FlightSearchSubmit = () => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);

    //  Get flight type
    const flightType = state.find(obj => obj.key === 'flight_type');
    
    //  Filter context keys before url-building
    const urlParams = state.filter((obj)=>{
        if(obj.key !== 'built_fetch_url'){
            if(flightType.value === 'oneway') {
                if(obj.key !== 'return_from'){
                    return obj.key;
                }
            } else {
                return obj.key;
            };
        }
    });
    
    //  Build the fetch-URL
    const builtFetchUrl = urlBuilder().construct(
        urls().kiwiBase,
        urlParams
    );

    /* 
        builtNavLinkUrl vs. builtFetchUrl

        - builtNavLinkUrl -> is being used as a NavLink url and by the router 
        - builtFetchUrl -> is being sent to context for fetching
        - It is a double failsafe, in case somebody wants to save the url of their search results
    */

    //  Build the NavLink-URL
    const builtNavLinkUrl = urlBuilder().construct(
        r().flights,
        urlParams
    );

    //  Handle submit button
    const handleSubmit = () => {
        dispatch({
                    target: 'built_fetch_url',
                    payload: builtFetchUrl
                }) 
    }

    return (
        
        <Row className="mt-3 text-center">
            <Col>
                <RSNavLink to={builtNavLinkUrl} onClick={handleSubmit} tag={NavLink}>
                    <Button color="primary" style={{borderRadius:"1.5rem"}} >
                    <IconSearch color="white" size="18"/> Submit
                    </Button>
                </RSNavLink>
            </Col>
        </Row>
        
    );
}

export default FlightSearchSubmit;