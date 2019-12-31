import React, { useState, Suspense } from 'react';

/* 
    Reactstrap imports
*/
import { Jumbotron, Card, CardBody } from 'reactstrap';

/*
    Component imports: Content
*/
const FlightDetailToggles = React.lazy( () => import( '../content/homesearch/FlightDetailToggles.jsx' ) );
const FlightSearchForm = React.lazy( () => import( '../content/homesearch/FlightSearchForm.jsx' ) );

const HomeSearch = () => {
    const [dropdownOpen, setDropdownOpen] = useState( 'none' );
    
    const toggle = ( specify ) => {
        if ( dropdownOpen === specify ) {
            setDropdownOpen( 'none' );
        } else {
            setDropdownOpen( specify )
        }
    };

    return (
        <Jumbotron fluid className="pb-0 mb-0">
            
            <h1 className="text-center">Flights</h1>
            
            <Card>
                <CardBody>
                    
                    <Suspense fallback={<p>Loading flight search form...</p>}>

                        <FlightDetailToggles dropdownOpen={dropdownOpen} toggle={toggle}/>

                        <FlightSearchForm />

                    </Suspense>

                </CardBody>
            </Card>
            
        </Jumbotron>
    )
}

export default HomeSearch;