import React, {useContext} from 'react';

/* Context imports */
import {FlightContext} from '../../../../flightContext.jsx';

/* General Imports */
import {date} from '../../../../tools.js';

/* Reactstrap imports */
import { Spinner, Table } from 'reactstrap';

/* Component imports: Graphics */
import square128 from '../../../../img/square128.jpg';

const ResultsList = () => {
    const {state} = useContext(FlightContext);

        return (

                <Table className="shadow mt-1 mb-1" style={{border: "1px solid rgba(0, 0, 0, 0.125)"}}>
                    <tbody>
                        {
                            state[2].flightsFound.map( ( flight, index ) => (
                                <tr key={`flight_list_result_${index}`}>

                                    {/* Left 2: Airline logo*/}
                                    <td className="align-middle" style={{width:"10%"}}>
                                        <img src={square128} className="img-fluid p-0" alt="airline_logo"/>
                                    </td>

                                    {/* Left 2: time, airlane name */}
                                    <td className="align-middle text-left" style={{width:"23%"}}>
                                        <p className="font-weight-bold m-0">{date().timeFromUnix( flight.dTimeUTC )} - {date().timeFromUnix( flight.aTimeUTC )}</p>
                                        <p className="text-secondary m-0">{flight.airlines[0]}</p>
                                    </td>

                                    {/* Center: Flight duration, iata code of origin->destination airport, Direct or with layovers */}
                                    <td className="align-middle text-center" style={{width:"33%"}}>
                                        <div className="d-flex justify-content-around align-items-center">
                                            <div>
                                                <p className="m-0">{flight.fly_duration}</p>
                                                <p className="m-0 text-secondary">{flight.flyFrom} - {flight.flyTo}</p>
                                            </div>
                                            <p className="m-0">{(flight.has_airport_change) ? "With layovers":"Direct"}</p>
                                        </div>
                                    </td>

                                    {/* Right: Price and additional options */}
                                    <td className="align-middle text-right" style={{width:"33%"}}>
                                        <p className="m-0 text-success">&euro; {flight.price}</p>
                                    </td>

                                </tr>
                            ) )
                        }
                    </tbody>
                </Table>

        )
    
}
export default ResultsList;