import React, {useState, useContext} from 'react';

/* 
    Context imports
*/
import {FlightContext} from '../../../flightContext.jsx';

/* 
    General imports
*/
import {urls} from '../../../locations.js';
import {urlBuilder} from '../../../tools.js';

/* 
    Reactstrap imports
*/
import {Row, Col, Button} from 'reactstrap';

/*
    Component imports: Icon
*/
import {IconSearch} from '../../general/Icons.jsx';


const FlightSearchSubmit = () => {
    //  Context
    const {state, dispatch} = useContext(FlightContext);

    const flightType = state.find(obj => obj.key === 'flight_type');

    //  Handle submit button
    const handleSubmit = () => {
        //  Filter context objects conditionally
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
        const builtUrl = urlBuilder().construct(
            urls().kiwiBase,
            urlParams
        );

        console.log(urlParams);

        /* 
        dispatch({
                    target: 'built_fetch_url',
                    payload: builtUrl
                }) 
        */
    }

    return (
        
        <Row className="mt-3 text-center">
            <Col>
                <Button onClick={handleSubmit} color="primary" style={{borderRadius:"1.5rem"}}>
                    <IconSearch color="white" size="18"/> Submit
                </Button>
            </Col>
        </Row>
        
    );
}

export default FlightSearchSubmit;