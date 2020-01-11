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
            <Col>
                <FlightSearchField identifier="fly_from" placeholder="Origin..."/>
            </Col>
        
            <Col>
                <FlightSearchField identifier="fly_to" placeholder="Destination..."/>
            </Col>
        
            <Col>
                <FlightDatePicker identifier="date_from" label="Depart"/>
            </Col>
            
            <Col>
                <FlightDatePicker identifier="return_from" label="Return"/>
            </Col>
        </Row>
    )
};

export default FlightSearchForm;