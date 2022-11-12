import React from 'react';
import { usePagination, DOTS } from './hooks/usePagination';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className="btn-group mt-5">

            <button className={`btn`} disabled={currentPage === 1} onClick={onPrevious} >{`<`}</button>
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return (<button className="btn btn-disabled">...</button>)
                }

                return (
                    <button className={`btn ${pageNumber === currentPage ? 'btn-active' : ''}`} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </button>
                )
            })}


            <button className={`btn`} disabled={currentPage === lastPage} onClick={onNext} >{`>`}</button>

        </div >
    )

};

export default Pagination;
