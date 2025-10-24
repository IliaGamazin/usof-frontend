import {useAuthFetch} from "../../../services/Api.js";
import {getPost} from "../../../services/PostService.js";
import {getMe, getUser} from "../../../services/UserService.js";
import {useAuth} from "../../../context/AuthContext.jsx";

import styles from "./PostPage.module.css";
import {Link} from "react-router-dom";
import Button from "../../common/button/Button.jsx";
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";
import ShareButton from "../../common/share/ShareButton.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

export default function PostPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [score, setScore] = useState(0);
    const [categories, setCategories] = useState(null);
    const [author, setAuthor] = useState(null);
    const [images, setImages] = useState([]);
    const [isMe, setIsMe] = useState(false);
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
            setCategories(postData.categories);
            setScore(postData.score);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleVote = async (voteType) => {
        console.log(`Voting ${voteType} for post ${id}`);
    };

    useEffect(() => {
        if (id) {
            fetchPostData(id);
        }
        else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <PagePlaceholder type="loading" message="Loading post..." />;
    }

    if (!post) {
        return (
            <PagePlaceholder
                type="not-found"
                message="Post not found or an error occurred"
            />
        );
    }

    const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    window.scrollTo(0, 0);

    return (
        <article className={styles.postContainer}>
            <header className={styles.postHeader}>
                <div className={styles.postHeaderTop}>
                    <div className={styles.votingSection}>
                        <button
                            className={styles.voteButton}
                            onClick={() => handleVote('up')}
                            aria-label="Upvote"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 4L3 15H9V20H15V15H21L12 4Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <span className={styles.postScore}>{post.score || 0}</span>
                        <button
                            className={styles.voteButton}
                            onClick={() => handleVote('down')}
                            aria-label="Downvote"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 20L21 9H15V4H9V9H3L12 20Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={styles.titleSection}>
                        <h1 className={styles.postTitle}>{post.title}</h1>
                        <p className={styles.postMeta}>
                            <span>Post ID: {post.id}</span>
                            <span>{postDate}</span>
                        </p>
                    </div>
                </div>
                <div className={styles.authorSection}>
                    <Link to={`/users/${author.id}`} className={styles.authorLink}>
                        <img
                            src={author.pfp ? `http://localhost:8080${author.pfp}` : "/src/assets/Mr_avatarko.png"}
                            alt={`${author.login}'s profile`}
                            className={styles.avatar}
                        />
                    </Link>
                    <div className={styles.authorInfo}>
                        <Link to={`/users/${author.id}`} className={styles.authorLink}>
                            <span className={styles.authorName}>{author.login}</span>
                        </Link>
                        <span className={styles.authorRating}>Rating: {author.rating || 0}</span>
                    </div>
                </div>
                <div className={styles.buttonBlock}>
                    <Button className={styles.followButton}>
                        Follow
                    </Button>
                    <Button className={styles.followButton}>
                        To favourites
                    </Button>
                </div>
                <ShareButton />
            </header>
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