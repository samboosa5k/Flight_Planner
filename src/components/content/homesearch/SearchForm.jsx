import React, { Suspense } from 'react';

/* 
    Reactstrap imports
*/
import { Container, Jumbotron, Card, CardBody } from 'reactstrap';

/*
    Component imports: SearchForm
    - Toggles
    - Search fields
    - Submit functionality
*/
const FlightDetailToggles = React.lazy( () => import( './searchform/FlightDetailToggles.jsx' ) );
const FlightSearchForm = React.lazy( () => import( './searchform/FlightSearchForm.jsx' ) );
const FlightSearchSubmit = React.lazy( () => import( './searchform/FlightSearchSubmit.jsx' ) );


//  Search section on 'HomeSearch' view
const SearchForm = () => {
    return (
        <>
            <Container className="searchform-container mb-3">
                
                <Jumbotron fluid className="pb-0 mb-0">
                    <h1 className="text-center">Flights</h1>
                </Jumbotron>
                
                <Card className="searchform">
                    <CardBody className="p-3">
                        <Suspense fallback={<p>Loading flight search form...</p>}>
                            <FlightDetailToggles/>
                            <FlightSearchForm/>
                            <FlightSearchSubmit/>
                        </Suspense>
                    </CardBody>
                </Card>

            </Container>
        </>
    )
}

export default SearchForm;