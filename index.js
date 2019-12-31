import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* 
    Global variable imports
*/
import { routes } from "./src/routes.js";

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

const Index = () => (
    <>
        <Router basename={routes().basename}>
            <Suspense fallback={<p>Interface loading...</p>}>
                <Header />
                    <Switch>
                    <Route path="/" render={( routeProps ) => {
                        return <Content pageContent={routeProps.location.pathname} />;
                        }} />
                    </Switch>
                <Footer />
            </Suspense>
        </Router>
    </>
);

ReactDOM.render( <Index/>, document.getElementById( 'root' ) );
