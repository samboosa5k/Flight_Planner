import React from 'react';

/* 
    Reactstrap imports
*/
import { Navbar, Nav } from 'reactstrap';

/* 
    Component imports: Header
*/
import Logo from './general/Logo.jsx';


const Header = () => (
    
        <Navbar expand="md" className="header bg-light flex-grow-0" tag="header">
            <Logo />
            <Nav>
                <a href="https://github.com/samboosa5k" target="_blank" rel="noopener noreferrer" className="text-secondary">
                    My Github
                </a>
            </Nav>
        </Navbar>

)

export default Header;