import React, {useState, useEffect} from 'react';

/* 
    Reactstrap imports
*/
import { Row, Col, Spinner } from 'reactstrap';

const ResultsList = ({flightsFound}) => {
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
        return <p key={`flight_${index}`}>{flight.mapIdfrom} {flight.dTimeUTC}</p>
        });
    }
}

export default ResultsList;