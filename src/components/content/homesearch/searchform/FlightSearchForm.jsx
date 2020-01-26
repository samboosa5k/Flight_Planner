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

const FlightSearchForm = ({ignores}) => {
    return (
        <Row>
            <Col xs="12" sm="6" md="3" lg="3" className="mb-2 mb-sm-2 mb-md-0">
                <FlightSearchField identifier="fly_from" placeholder="Origin..."/>
            </Col>
        
            <Col xs="12" sm="6" md="3" lg="3" className="mb-2 mb-sm-2 mb-md-0">
                <FlightSearchField identifier="fly_to" placeholder="Destination..."/>
            </Col>
        
            <Col xs="12" sm="6" md="3" lg="3" className="mb-2 mb-sm-2 mb-md-0">
                <FlightDatePicker identifier="date_from" label="Depart" ignores={ignores}/>
            </Col>
            
            <Col xs="12" sm="6" md="3" lg="3" className="mb-0">
                <FlightDatePicker identifier="return_from" label="Return" ignores={ignores}/>
            </Col>
        </Row>
    )
};

export default FlightSearchForm;