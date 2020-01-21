import React from 'react';
import {NavLink} from 'react-router-dom';

/* 
    General imports
*/
import {routes as r, urls} from '../../../../locations.js';
import {urlBuilder} from '../../../../tools.js';

/* 
    Reactstrap imports
*/
import {Row, Button, NavLink as RSNavLink} from 'reactstrap';

/*
    Component imports: Icon
*/
import {IconSearch} from '../../../general/Icons.jsx';


const FlightSearchSubmit = ({isNewSearch, urlParams, doFetch}) => { 
    //  Build the NavLink-URL
    const builtNavLinkUrl = urlBuilder().construct(
        r().flights,
        urlParams
    );

    //  Handle submit button
    const handleSubmit = () => {
        if(isNewSearch(urlParams)){
            doFetch();
        } else {
            console.log('Same search');
        }        
    }

    return (
        
        <Row>
                <RSNavLink className="ml-auto mr-auto p-0" style={{transform:"translateY(50%)"}} onClick={handleSubmit} to={builtNavLinkUrl} tag={NavLink}>
                    <Button color="primary" style={{borderRadius:"1.65rem"}} >
                        <IconSearch color="white" size="18"/> Submit
                    </Button>
                </RSNavLink>
        </Row>
        
    );
}

export default FlightSearchSubmit;