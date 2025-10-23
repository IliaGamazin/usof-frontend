import React from 'react';
import styles from './PagePlaceholder.module.css';

export default function PagePlaceholder({ type = 'loading', message, onRetry }) {
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
                <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
                <p className={styles.errorMessage}>
                    {message || 'Unable to load the content. Please try again.'}
                </p>
                {onRetry && (
                    <button onClick={onRetry} className={styles.retryButton}>
                        Try Again
                    </button>
                )}
            </div>
        );
    }

    if (type === 'not-found') {
        return (
            <div className={styles.container}>
                <h2 className={styles.notFoundTitle}>404</h2>
                <p className={styles.notFoundMessage}>
                    {message || 'The page you are looking for does not exist.'}
                </p>
            </div>
        );
    }

    return null;
}
