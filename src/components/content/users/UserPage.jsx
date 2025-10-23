import React from 'react';
import {Link, useParams} from "react-router";
import { useState, useEffect } from 'react';
import {getMe, getUser} from "../../../services/UserService.js";
import {getUserPosts} from "../../../services/PostService.js";
import {useNavigate} from "react-router";

import styles from "./UserPage.module.css";
import {useAuthFetch} from "../../../services/Api.js";
import {useAuth} from "../../../context/AuthContext.jsx";
import PostPreview from "../../common/previews/post/PostPreview.jsx";
import Pagination from "../../common/pagination/Pagination.jsx";
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";

export default function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMe, setIsMe] = useState(false);
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { isAuthenticated} = useAuth();

    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [orderBy, setOrderBy] = useState("score");
    const [orderDir, setOrderDir] = useState("DESC");

    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                setLoading(true);
                const userData = await getUser(id);
                setUser(userData);
                if (isAuthenticated) {
                    const myData = await getMe(authFetch);
                    if (userData.id === myData.id) {
                        setIsMe(true);
                    }
                }
                const postData = await getUserPosts(id, page, limit, orderBy, orderDir);
                setPosts(postData.data);
                setPagination(postData.pagination);
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

    }, [id]);

    if (loading) {
        return <PagePlaceholder type="loading" message="Loading user profile..." />;
    }

    if (!user) {
        return (
            <PagePlaceholder
                type="not-found"
                message="User not found or an error occurred"
            />
        );
    }

    window.scrollTo(0, 0);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profileContent}>
                    <img
                        src={user.pfp ? `http://localhost:8080${user.pfp}` : "/src/assets/Mr_avatarko.png"}
                        alt="Profile picture"
                    />
                    <div className={styles.credentials}>
                        <div className={styles.nameBlock}>
                            <h3 className={styles.nickname}>{user.login}</h3>
                            <span className={styles.role}>[{user.role}]</span>
                        </div>

                        <p className={styles.fullNameLabel}>Full name:</p>
                        <h4 className={styles.name}>
                            {user.firstname} {user.lastname}
                        </h4>
                    </div>
                </div>

                <div className={styles.statsBlock}>
                    <p>
                        Rating: <span className={styles.ratingValue}>{user.rating}</span>
                    </p>
                    <p className={styles.joinDate}>
                        Joined {new Date(user.created_at).toLocaleDateString()}
                    </p>
                </div>
                {isMe && (
                    <div className={styles.personalBlock}>
                        <h1>me</h1>
                    </div>
                )}
            </div>
            <div>
                {posts?.length > 0 ? (
                    <div>
                        {posts.map(post => (
                            <PostPreview
                                key={post.id}
                                author_id={post.author_id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                score={post.score}
                                createdAt={post.created_at}
                                categories={post.categories}
                                withLink={false}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <h2 className={styles.emptyTitle}>This user has no posts yet!</h2>
                        {isMe && (
                            <h3 className={styles.emptySubtitle}>
                                Want to <Link to="?modal=write" className={styles.createLink}>create</Link> one?
                            </h3>
                        )}
                    </div>
                )}
            </div>
            {pagination?.total_pages > 1 && (
                <Pagination
                    totalPages={pagination.total_pages}
                    currentPage={page}
                    setPage={setPage}
                />
            )}
        </>
    );
}
