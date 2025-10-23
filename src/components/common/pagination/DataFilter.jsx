import React from 'react';

import styles from './DataFilter.module.css'

export default function DataFilter({
                                       orderBy,
                                       setOrderBy,
                                       orderDir,
                                       setOrderDir,
                                       setPage,
                                       allowedSortParams = []
                                   }) {
    const handleOrderByChange = (e) => {
        setOrderBy(e.target.value);
        setPage(1);
    };

    const toggleOrderDir = () => {
        setOrderDir(orderDir === "ASC" ? "DESC" : "ASC");
        setPage(1);
    };

    if (!allowedSortParams.length) {
        return null;
    }

    return (
        <div className={styles.container}>
            {allowedSortParams.length > 1 && (
                <>
                    <span className={styles.label}>Sort by:</span>
                    <select
                        className={styles.select}
                        value={orderBy}
                        onChange={handleOrderByChange}
                        aria-label="Sort by"
                    >
                        {allowedSortParams.map((param, index) => (
                            <option key={index} value={param.value}>
                                {param.label || param.value}
                            </option>
                        ))}
                    </select>
                </>
            )}

            <button
                className={styles.directionButton}
                onClick={toggleOrderDir}
                type="button"
                aria-label={`Sort direction: ${orderDir === 'ASC' ? 'Ascending' : 'Descending'}`}
            >
                {orderDir === 'ASC' ? '↑' : '↓'}
            </button>
        </div>
    );
};
