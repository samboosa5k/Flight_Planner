import React from 'react';

/* 
    Reactstrap imports
*/
import { Row, Col } from 'reactstrap';

/*
    Component imports: Content
*/
import FlightSearchField from './FlightSearchField.jsx';
import FlightDatePicker from './FlightDatePicker.jsx';

const FlightSearchForm = () => {
    return (
        <Row>
            <Col md="3" sm="12">
                <FlightSearchField identifier="fly_from" placeholder="Origin..."/>
            </Col>
        
            <Col md="3" sm="12">
                <FlightSearchField identifier="fly_to" placeholder="Destination..."/>
            </Col>
        
            <Col md="3" sm="12">
                <FlightDatePicker identifier="date_from" label="Depart"/>
            </Col>
            
            <Col md="3" sm="12">
                <FlightDatePicker identifier="return_from" label="Return"/>
            </Col>
        </Row>
    )
};

export default FlightSearchForm;