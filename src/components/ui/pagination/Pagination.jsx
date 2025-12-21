import React from 'react';
import classes from './Pagination.module.css';
import {getPageArray} from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    const pagesArray = getPageArray(totalPages);

    return (
        <div className={classes.page__wrapper}>
            {pagesArray.map(number =>
                <span
                    key={number}
                    onClick={() => changePage(number)}
                    className={classes.page + ' ' + (page === number ? classes.page__current : '')}
                >{number}</span>
            )}
        </div>
    );
};

export default Pagination;