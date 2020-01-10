import React from 'react';

/* 
    Reactstrap imports
*/
import { Col, Row, Input } from 'reactstrap';

/*
    Component imports: Content
*/
import FlightSearchField from './FlightSearchField.jsx';
import FlightDatePicker from './FlightDatePicker.jsx';

//  Handle whole form submission:  MOVE THIS to FlightSearchForm.jsx
const handleSubmission = ( query ) => {
    const iata = iataDB.find( ( q ) => {
        return q.location.includes( query ) === true;
    } );

    console.log( iata );

    /* 
    dispatch({
                target: context key for the url,
                payload: the actual built url
            }) 
    */
}

const FlightSearchForm = () => {
    return (
        <Row>
            <Col>
                <FlightSearchField identifier="origin" placeholder="Origin..."/>
            </Col>
        
            <Col>
                <FlightSearchField identifier="destination" placeholder="Destination..."/>
            </Col>
        
            <Col>
                <FlightDatePicker identifier="departureDate" label="Depart"/>
            </Col>
            
            <Col>
                <FlightDatePicker identifier="returnDate" label="Return"/>
            </Col>
        </Row>
    )
};

export default FlightSearchForm;