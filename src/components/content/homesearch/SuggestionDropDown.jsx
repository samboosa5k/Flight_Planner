import React from 'react';
import PropTypes from 'prop-types';

/* 
    Reactstrap imports
*/
import { DropdownMenu, DropdownItem } from 'reactstrap';

const SuggestionDropDown = ( { isOpen, suggestions, dropSelect, identifier } ) => {
    //  Hacky reactstrap/dropdown visibility condition
    const _opacity = (isOpen) ? '100%' : '0';

    return(
    <DropdownMenu id={`suggestions_${identifier}`} style={{opacity: _opacity, position:'relative'}}>
        {
            suggestions.map( ( obj, index ) => (
                <DropdownItem key={`sugItem_${index}`} onClick={()=>{dropSelect(obj, 'btn')}}>
                    {obj.airport}
                </DropdownItem>
            ) )
        }
    </DropdownMenu>
    )
};

SuggestionDropDown.propTypes = {
    suggestions: PropTypes.array,
    identifier: PropTypes.string.isRequired,
    dropSelect: PropTypes.func,
    isOpen: PropTypes.bool.isRequired
}

export default SuggestionDropDown;