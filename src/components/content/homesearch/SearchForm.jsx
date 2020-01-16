import React, { useState, Suspense } from 'react';

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
    //  State - manage which fields are inactive based on other toggles
    const [ignores, setIgnores] = useState(['return_from']);

    return (
        <>
            <Container className="searchform-container mb-3">
                
                <Jumbotron fluid className="pb-0 mb-0" style={{backgroundColor:"rgba(224,249,249, 0.4)"}}>
                    <h1 className="display-3 text-center">Flights</h1>
                </Jumbotron>
                
                <Card className="searchform">
                    <CardBody className="p-3">
                        <Suspense fallback={<p>Loading flight search form...</p>}>
                            <FlightDetailToggles ignores={ignores} setIgnores={setIgnores}/>
                            <FlightSearchForm ignores={ignores}/>
                            <FlightSearchSubmit ignores={ignores}/>
                        </Suspense>
                    </CardBody>
                </Card>

            </Container>
        </>
    )
}

export default SearchForm;