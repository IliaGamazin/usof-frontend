import {useAuthFetch} from "../../../services/Api.js";
import {getPost, getPostInteractions, removeLike, addLike, patchPost} from "../../../services/PostService.js";
import {getMe, getUser} from "../../../services/UserService.js";
import {followPost, unFollowPost, favouritePost, unFavouritePost} from "../../../services/SubscriptonService.js";
import {useAuth} from "../../../context/AuthContext.jsx";
import styles from "./PostPage.module.css";
import {Link} from "react-router-dom";
import Button from "../../common/button/Button.jsx";
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";
import ShareButton from "../../common/share/ShareButton.jsx";
import EditPostSection from './EditPostSection.jsx';
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import CommentList from "../comments/CommentList.jsx";

export default function PostPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [score, setScore] = useState(0);
    const [categories, setCategories] = useState(null);
    const [author, setAuthor] = useState(null);
    const [images, setImages] = useState([]);
    const [isMe, setIsMe] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const authFetch = useAuthFetch();
    const navigate = useNavigate();
    const { isAuthenticated} = useAuth();
    const location = useLocation();
    const [interactions, setInteractions] = useState({
        like_status: "NONE",
        followed: false,
        favourites: false,
    });

    const fetchPostData = async (id) => {
        try {
            setLoading(true);
            const postData = await getPost(id);
            if (isAuthenticated)  {
                const myData = await getMe(authFetch);
                if (postData.post.author_id === myData.id) {
                    setIsMe(true);
                }
                const interactionsData = await getPostInteractions(authFetch, id);
                setInteractions(interactionsData);
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
        const newLikeStatus = voteType === 'up' ? 'LIKE' : 'DISLIKE';

        if (!isAuthenticated) {
            navigate(`${location.pathname}?modal=auth/login`);
            return;
        }

        try {
            if (interactions.like_status === newLikeStatus) {
                await removeLike(authFetch, id);
                setInteractions(prev => ({ ...prev, like_status: 'NONE' }));
                setScore(prev => prev + (voteType === 'up' ? -1 : 1));
            }
            else {
                await addLike(authFetch, id, newLikeStatus);

                let scoreDelta = 0;
                if (interactions.like_status === 'LIKE') {
                    scoreDelta = voteType === 'up' ? 0 : -2;
                }
                else if (interactions.like_status === 'DISLIKE') {
                    scoreDelta = voteType === 'up' ? 2 : 0;
                }
                else {
                    scoreDelta = voteType === 'up' ? 1 : -1;
                }

                setInteractions(prev => ({ ...prev, like_status: newLikeStatus }));
                setScore(prev => prev + scoreDelta);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleFollowToggle = async () => {
        if (!isAuthenticated) {
            navigate(`${location.pathname}?modal=auth/login`);
            return;
        }

        try {
            if (interactions.followed) {
                await unFollowPost(authFetch, id);
                setInteractions(prev => ({ ...prev, followed: false }));
            }
            else {
                await followPost(authFetch, id);
                setInteractions(prev => ({ ...prev, followed: true }));
            }
        }
        catch (error) {
            console.error('Follow toggle error:', error);
        }
    };

    const handleFavouriteToggle = async () => {
        if (!isAuthenticated) {
            navigate(`${location.pathname}?modal=auth/login`);
            return;
        }

        try {
            if (interactions.favourites) {
                await unFavouritePost(authFetch, id);
                setInteractions(prev => ({ ...prev, favourites: false }));
            }
            else {
                await favouritePost(authFetch, id);
                setInteractions(prev => ({ ...prev, favourites: true }));
            }
        }
        catch (error) {
            console.error('Favourite toggle error:', error);
        }
    };

    const handleEditSave = async (formData) => {
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('content', formData.content);

            formData.categories.forEach(cat => {
                submitData.append('categories', cat.id);
            });

            formData.filesToDelete.forEach(imageId => {
                submitData.append('files_to_delete', imageId);
            });

            formData.newImages.forEach(image => {
                submitData.append('images', image);
            });

            const result = await patchPost(authFetch, id, submitData);

            setPost(result.post);
            setCategories(result.categories);
            setImages(result.images);
            setIsEditing(false);

            await fetchPostData(id);
        }
        catch (error) {
            setError(error.message);
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
        <>
            <article className={styles.postContainer}>
                <header className={styles.postHeader}>
                    <div className={styles.postHeaderTop}>
                        <div className={styles.votingSection}>
                            <button
                                className={`${styles.voteButton} ${interactions.like_status === 'LIKE' ? styles.voteButtonActive : ''}`}
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
                            <span className={styles.postScore}>{score || 0}</span>
                            <button
                                className={`${styles.voteButton} ${interactions.like_status === 'DISLIKE' ? styles.voteButtonActive : ''}`}
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
                        <Button
                            className={styles.followButton}
                            onClick={handleFollowToggle}
                        >
                            {interactions.followed ? 'Unfollow' : 'Follow'}
                        </Button>
                        <Button
                            className={styles.followButton}
                            onClick={handleFavouriteToggle}
                        >
                            {interactions.favourites ? 'Remove from favourites' : 'To favourites'}
                        </Button>
                        {isMe && !isEditing && (
                            <Button
                                className={styles.editButton}
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Post
                            </Button>
                        )}
                    </div>
                    <ShareButton />
                </header>

                {isEditing ? (
                    <div>
                        {error && (
                            <h3 className={styles.error}>{error}</h3>
                        )}
                        <EditPostSection
                            post={post}
                            images={images}
                            categories={categories}
                            onSave={handleEditSave}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </article>
            <CommentList postId={id} />
        </>
    );
}