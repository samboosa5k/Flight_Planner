import React from 'react';
import PropTypes from 'prop-types';

/* 
    Reactstrap imports
*/
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

const LangCurrMenu = ({dropdownOpen, toggle}) => (
    <Nav className="footer__langCurrMenu" color="light">
        <Dropdown nav isOpen={dropdownOpen === 'language'} toggle={() => toggle( 'language' )}>
            <DropdownToggle nav caret>
                Language
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Dutch</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>English</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown nav isOpen={dropdownOpen === 'currency'} toggle={() => toggle( 'currency' )}>
            <DropdownToggle nav caret>
                Currency
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Euro</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Dollar</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Nav>
);

LangCurrMenu.propTypes = {
    dropdownOpen: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired
}

export default LangCurrMenu;