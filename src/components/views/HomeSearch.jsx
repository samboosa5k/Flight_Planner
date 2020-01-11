import React, { useState, Suspense } from 'react';

/* 
    Reactstrap imports
*/
import { Container, Jumbotron, Card, CardBody } from 'reactstrap';

/*
    Component imports: Content
*/
const FlightDetailToggles = React.lazy( () => import( '../content/homesearch/FlightDetailToggles.jsx' ) );
const FlightSearchForm = React.lazy( () => import( '../content/homesearch/FlightSearchForm.jsx' ) );
const FlightSearchSubmit = React.lazy( () => import( '../content/homesearch/FlightSearchSubmit.jsx' ) );

const HomeSearch = () => {
    
    return (
        <>
            <Container className="searchform-container">
                
                <Jumbotron fluid className="pb-0 mb-0">
                    <h1 className="text-center">Flights</h1>
                </Jumbotron>
                
                <Card className="searchform">
                    <CardBody className="p-3">
                        <Suspense fallback={<p>Loading flight search form...</p>}>
                            <FlightDetailToggles />
                            <FlightSearchForm />
                            <FlightSearchSubmit/>
                        </Suspense>
                    </CardBody>
                </Card>

            </Container>
        </>
    )
}

export default HomeSearch;