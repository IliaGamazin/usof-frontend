import React from 'react';
import styles from './SidebarPlaceholder.module.css';

export default function SidebarPlaceholder({ type = 'loading', message }) {
    if (type === 'loading') {
        return (
            <div className={styles.container}>
                <div className={styles.spinner}></div>
                <p className={styles.message}>
                    {message || 'Loading...'}
                </p>
            </div>
        );
    }

    if (type === 'error') {
        return (
            <div className={styles.container}>
                <div className={styles.errorIcon}>!</div>
                <p className={styles.errorMessage}>
                    {message || 'Failed to load'}
                </p>
            </div>
        );
    }

    if (type === 'empty') {
        return (
            <div className={styles.container}>
                <p className={styles.emptyMessage}>
                    {message || 'No data available'}
                </p>
            </div>
        );
    }

    return null;
}