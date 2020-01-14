import React from 'react';

/* 
    Reactstrap imports
*/
import { Navbar, Nav, NavItem } from 'reactstrap';

/* 
    Component imports: Header
*/
import Logo from './general/Logo.jsx';


const Header = () => (
    
        <Navbar expand="md" className="header bg-light" tag="header">
            <Logo />
            <Nav>
                <NavItem>
                    This is the navbar...
                </NavItem>
                </Nav>
        </Navbar>

)

export default Header;