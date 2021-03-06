import React from 'react';
import {NavLink} from 'react-router-dom';

/* General imports */
import {routes as r} from '../../locations.js';

/* 
    Reactstrap imports
*/
import { NavLink as RSNavLink } from 'reactstrap';

const Logo = () => (
    <RSNavLink href={r().home} className="logo navbar-brand">
        Gooble Flights
    </RSNavLink>
)

export default Logo;