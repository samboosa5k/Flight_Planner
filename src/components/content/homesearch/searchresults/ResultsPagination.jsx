import React from 'react';

/* Reactstrap imports */
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ResultsPagination = ({totalFlights, perPage, setPageNr}) => {
    const paginationCount = Math.ceil(totalFlights/perPage);
    const paginationArray = [];
    for ( let i = 0; i < paginationCount; i++){
        paginationArray.push(
            <PaginationItem>
                <PaginationLink href="#" onClick={()=>{setPageNr(i)}}>
                    {i+1}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <Pagination>
            {paginationArray}
        </Pagination>
    )
}

export default ResultsPagination;