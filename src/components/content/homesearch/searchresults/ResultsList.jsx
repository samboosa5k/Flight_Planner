import React, {useContext} from 'react';

/* Context imports */
import {FlightContext} from '../../../../flightContext.jsx';

/* General Imports */
import {date} from '../../../../tools.js';

/* Reactstrap imports */
import { Card, Table } from 'reactstrap';

const ResultsList = () => {
    const {state} = useContext(FlightContext);

        return (
            <Card className="p-3">
                <Table className="mt-1 mb-1">
                    <tbody>
                        {
                            state[2].flightsFound.map( ( flight, index ) => (
                                <tr key={`flight_list_result_${index}`}>
                                    <td className="col-4 align-middle text-left">
                                        <p className="m-0 font-weight-bold">{date().timeFromUnix( flight.dTimeUTC )} - {date().timeFromUnix( flight.aTimeUTC )}</p>
                                        <p className="m-0 text-secondary">{flight.airlines[0]}</p>
                                    </td>
                                    <td className="col-4 align-middle text-center">
                                        <p className="m-0">{flight.fly_duration}</p>
                                        <p className="m-0 text-secondary">{flight.flyFrom} - {flight.flyTo}</p>
                                    </td>
                                    <td className="col-4 align-middle text-right">
                                        <p className="m-0 text-success">&euro; {flight.price}</p>
                                    </td>
                                </tr>
                            ) )
                        }
                    </tbody>
                </Table>
            </Card>
        )
    
}
export default ResultsList;