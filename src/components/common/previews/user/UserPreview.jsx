import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserPreview.module.css';;

export default function UserPreview({ id, username, rating, pfp }) {
    return (
        <Link to={`/users/${id}`} className={styles.userCard}>
            <img
                src={pfp ? `http://localhost:8080${pfp}` : "/src/assets/Mr_avatarko.png"}
                alt={`${username}'s profile picture`}
                className={styles.pfp}
            />
            <div className={styles.userInfo}>
                <h3 className={styles.username}>{username}</h3>
                <p className={styles.rating}>
                    Rating: <span className={styles.ratingValue}>{rating}</span>
                </p>
            </div>
        </Link>
    );
}
