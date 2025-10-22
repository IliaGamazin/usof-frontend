import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {useAuthFetch} from "../../../services/Api.js";
import {getPost} from "../../../services/PostService.js";
import {getMe, getUser} from "../../../services/UserService.js";
import {useAuth} from "../../../context/AuthContext.jsx";

import styles from "./PostPage.module.css";

export default function PostPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [images, setImages] = useState([]);
    const [isMe, setIsMe] = useState(false);
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { isAuthenticated} = useAuth();

    const fetchPostData = async (id) => {
        try {
            setLoading(true);
            const postData = await getPost(id);
            if (isAuthenticated)  {
                const myData = await getMe(authFetch);
                if (postData.author_id === myData.id) {
                    setIsMe(true);
                }
            }
            const authorData = await getUser(postData.post.author_id);
            setPost(postData.post);
            setAuthor(authorData);
            setImages(postData.images);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPostData(id);
        }
        else {
            setLoading(false);
        }
    }, [id]);

    if (loading) return <div>Loading post...</div>;
    if (!post) return <div>No user found</div>;

    const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    window.scrollTo(0, 0);

    return (
        <article className={styles.postContainer}>
            <header className={styles.postHeader}>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <p className={styles.postMeta}>
                    <span>Post ID: {post.id}</span>
                    <span>{postDate}</span>
                </p>
            </header>

            <div className={styles.postBody}>
                <p className={styles.postContent}>{post.content}</p>

                {images?.length > 0 && (
                    <div className={styles.gallerySection}>
                        <h2 className={styles.galleryTitle}>Attached Images</h2>
                        <div className={styles.imageGrid}>
                            {images.map((image) => (
                                <a
                                    key={image.file_path}
                                    href={`http://localhost:8080${image.file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.imageLink}
                                >
                                    <img
                                        src={`http://localhost:8080${image.file_path}`}
                                        alt="Post attachment"
                                        className={styles.postImage}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
