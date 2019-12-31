import React from 'react';

/* 
    Reactstrap imports
*/
import { Navbar, Nav, NavItem } from 'reactstrap';

/* 
    Component imports: Header
*/
import Logo from './global/Logo.jsx';


const Header = () => (
    <header className="header bg-light">
        <Navbar expand="md">
            <Logo />
            <Nav>
                <NavItem>
                    This is the navbar...
                </NavItem>
                </Nav>
        </Navbar>
    </header>
)

export default Header;