import React, {useState, useEffect} from 'react';

/* General Imports */
import {date} from '../../../../tools.js';

/* Reactstrap imports */
import { Row, Col, Card, CardBody, Spinner } from 'reactstrap';

const ResultsList = ({flightsFound}) => {
    //  If flightsFound prop not loaded, show spinner, else format the data
    //  - No state invovled, no lifecycles, this is the easiest solution to this problem thus far...
    if(flightsFound === undefined || flightsFound.length < 1){
        return (
            <Row className="mt-3 text-center">
                <Col>
                    <Spinner color="primary" />
                </Col>
            </Row>
        );
    } else {
        return flightsFound.map((flight, index)=>{
            return (

                        <Card key={`flight_${index}`}>
                            <CardBody>
                                <Row>
                                <Col xs="6">
                                    <p>From: {flight.cityFrom}Depart: {date().timeFromUnix( flight.dTime )}</p>
                                </Col>
                                <Col xs="6">
                                    <p>To: {flight.cityTo} Arrive: {date().timeFromUnix( flight.aTime )}</p>
                                </Col>
                                </Row>
                            </CardBody>
                        </Card>

            )
        });
    }
}

export default ResultsList;