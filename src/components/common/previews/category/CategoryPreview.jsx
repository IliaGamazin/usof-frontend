import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryPreview.module.css';;

export default function CategoryPreview({ id, title, description, posts }) {
    return (
        <Link to={`/users/${id}`} className={styles.categoryCard}>
            <div className={styles.categoryInfo}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>
                    {description}
                </p>
                <p>{posts}</p>
            </div>
        </Link>
    );
}
