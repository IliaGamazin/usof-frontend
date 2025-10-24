import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ totalPages, currentPage, setPage }) {

    const handlePrev = () => {
        setPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setPage(prev => Math.min(prev + 1, totalPages));
    };

    const getPaginationItems = () => {
        if (totalPages <= 5) {
            const pageNumbers = [];
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, '...', totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const paginationItems = getPaginationItems();

    return (
        <nav>
            <ul className={styles.pagination}>
                <li>
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`${styles.pageLink} ${currentPage === 1 ? styles.disabled : ''}`}
                    >
                        Prev
                    </button>
                </li>

                {paginationItems.map((item, index) => (
                    <li key={index}>
                        {typeof item === 'number' ? (
                            <button
                                onClick={() => setPage(item)}
                                className={`${styles.pageLink} ${item === currentPage ? styles.active : ''}`}
                            >
                                {item}
                            </button>
                        ) : (
                            <span className={styles.ellipsis}>...</span>
                        )}
                    </li>
                ))}

                <li>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`${styles.pageLink} ${currentPage === totalPages ? styles.disabled : ''}`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
