import React, {useState, useEffect} from 'react';

/* General Imports */
import {date} from '../../../../tools.js';

/* Reactstrap imports */
import { Row, Col, Card, Table, Spinner } from 'reactstrap';

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
        return (
            <Card className="p-3">
                <Table className="mt-1 mb-1">
                    <tbody>
                        {
                            flightsFound.map( ( flight, index ) => (
                                <tr key={`flight_list_result_${index}`}>
                                    <td className="col-4 align-middle text-left">
                                        <p className="m-0 font-weight-bold">{date().timeFromUnix( flight.dTime )} - {date().timeFromUnix( flight.aTime )}</p>
                                        <p className="m-0 text-secondary">{flight.airlines[0]}</p>
                                    </td>
                                    <td className="col-4 align-middle text-center">
                                        <p className="m-0">{flight.fly_duration}</p>
                                        <p className="m-0 text-secondary">{flight.flyFrom} - {flight.flyTo}</p>
                                    </td>
                                    <td className="col-4 align-middle text-right">
                                        <p className="m-0 text-success">{flight.price}</p>
                                    </td>
                                </tr>
                            ) )
                        }
                    </tbody>
                </Table>
            </Card>
        )
    }
}
export default ResultsList;