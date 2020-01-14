import React from 'react';
import {NavLink} from 'react-router-dom';

/* General imports */
import {routes as r} from '../../locations.js';

/* 
    Reactstrap imports
*/
import { NavbarBrand, } from 'reactstrap';

const Logo = () => (
    <NavbarBrand className="logo">
        <NavLink to={r().home}>Gooble Flights</NavLink>
    </NavbarBrand>
)

export default Logo;