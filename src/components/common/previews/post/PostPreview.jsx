import {Link} from "react-router-dom";
import styles from "./PostPreview.module.css"
import React, {useEffect, useState} from "react";

import {getUser} from "../../../../services/UserService.js";

export default function PostPreview({ author_id, id, title, content, score, createdAt, categories, withLink = true }) {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                setLoading(true);
                const userData = await getUser(author_id);
                setAuthor(userData);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData(id)
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }

    }, [author_id]);

    if (loading) return <div>Loading post...</div>;

    return (
        <div className={styles.container}>
            {withLink && (
                <div className={styles.authorSection}>
                    <Link to={`/users/${author_id}`}>
                        <img
                            src={author.pfp ? `http://localhost:8080${author.pfp}` : "/src/assets/Mr_avatarko.png"}
                            alt={`${author.login}'s profile`}
                            className={styles.avatar}
                        />
                    </Link>

                    <div className={styles.authorInfo}>
                        <Link to={`/users/${author_id}`}>
                            <h4 className={styles.authorName}>{author.login}</h4>
                        </Link>
                        <p className={styles.authorRating}>Rating: {author.rating}</p>
                    </div>
                </div>
            )}
            <div className={styles.postContent}>
                <Link to={`/posts/${id}`} className={styles.titleLink}>
                    <h2 className={styles.title}>{title}</h2>
                </Link>

                <p className={styles.content}>
                    {content.length > 150 ? `${content.substring(0, 150)}...` : content}
                </p>

                {categories && categories.length > 0 && (
                    <div className={styles.categories}>
                        {categories.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/categories/${cat.id}`}
                                className={styles.categoryTag}
                            >
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                )}

                <div className={styles.postMeta}>
                    <span className={styles.score}>Score: {score}</span>
                    <span className={styles.date}>
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
