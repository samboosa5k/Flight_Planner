import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/* 
    Global variable imports
*/
import { routes } from "./src/locations.js";

/* 
    Component imports: Layout
    - Add Header/Content/Footer etc. here
*/
const Header = React.lazy(()=> import('./src/Components/Header.jsx'));
const Content = React.lazy(()=> import('./src/Components/Content.jsx'));
const Footer = React.lazy( () => import( './src/Components/Footer.jsx' ) );

/* 
    Style imports
*/
import './src/styles/bootstrap.min.css';
import './src/styles/bootstrap-grid.min.css';
import './src/styles/bootstrap-reboot.min.css';
import './src/styles/bootstrap-utilities.min.css';

const Index = () => (
    <>
        <Router basename={routes().basename}>
            <Suspense fallback={<p>Interface loading...</p>}>
                    <Route path="/" render={( routeProps ) => (
                        <>
                        <Header />
                        <Content {...routeProps} />
                        <Footer />
                        </>
                    )}/>
            </Suspense>
        </Router>
    </>
);

ReactDOM.render( <Index/>, document.getElementById( 'root' ) );
