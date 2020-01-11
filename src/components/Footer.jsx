import React, {useState} from 'react';

/* 
    Reactstrap imports
*/
import { Nav, Container } from 'reactstrap';

/* 
    Component imports: Footer
*/
import Logo from './general/Logo.jsx';
import LangCurrMenu from './footer/LangCurrMenu.jsx';
import Disclaimer from './footer/Disclaimer.jsx';


const Footer = () => {
    const [dropdownOpen, setDropdownOpen] = useState( 'none' );

    const toggle = ( specify ) => {
        if ( dropdownOpen === specify ) {
            setDropdownOpen( 'none' );
        } else {
            setDropdownOpen( specify )
        }
    };
        
    return (
        <footer className="footer bg-light pb-2">
            <Container fluid="md">
                <Nav fluid="md">

                        <Logo />
                        
                        <LangCurrMenu dropdownOpen={dropdownOpen} toggle={toggle}/>
                        
                </Nav>
                <Disclaimer />
            </Container>
        </footer>
    )
}

export default Footer;