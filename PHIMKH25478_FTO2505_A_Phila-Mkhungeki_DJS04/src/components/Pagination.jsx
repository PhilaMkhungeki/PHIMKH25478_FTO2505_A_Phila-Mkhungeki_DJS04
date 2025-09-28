import React from 'react';
import { generatePageNumbers } from '../utils/paginationUtils';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = generatePageNumbers(currentPage, totalPages);

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            {/* First Page */}
            <button
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                « First
            </button>

            {/* Previous Page */}
            <button
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ‹ Prev
            </button>

            {/* Page Numbers */}
            {pageNumbers.map(page => (
                <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next Page */}
            <button
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next ›
            </button>

            {/* Last Page */}
            <button
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                Last »
            </button>
        </div>
    );
}