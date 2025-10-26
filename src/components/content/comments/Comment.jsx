import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {getMe, getUser} from '../../../services/UserService.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import AnswerList from './AnswerList.jsx';
import styles from './Comment.module.css';
import {getPostComments, addLike, removeLike, getLikeStatus, patchComment} from "../../../services/CommentService.js";
import {useAuthFetch} from "../../../services/Api.js";

export default function Comment({ commentId, comment, postId, depth = 0, onReply }) {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showReplies, setShowReplies] = useState(false);
    const [replyCount, setReplyCount] = useState(0);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [likeStatus, setLikeStatus] = useState('NONE');
    const [score, setScore] = useState(parseInt(comment.score) || 0);
    const [isMe, setIsMe] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [currentContent, setCurrentContent] = useState(comment.content);

    const authFetch = useAuthFetch();

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                setLoading(true);
                const userData = await getUser(comment.author_id);
                if (isAuthenticated) {
                    const myData = await getMe(authFetch);
                    if (myData.id === userData.id) {
                        setIsMe(true);
                    }
                    const status = await getLikeStatus(authFetch, comment.id);
                    setLikeStatus(status.like_status);
                }
                setAuthor(userData);
            } catch (err) {
                console.error('Error fetching author:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthor();
    }, [comment.author_id]);

    useEffect(() => {
        const fetchReplyCount = async () => {
            try {
                const data = await getPostComments(postId, 1, 1, 'created_at', 'ASC', comment.id);
                setReplyCount(data.pagination.total);
            } catch (err) {
                console.error('Error fetching reply count:', err);
            }
        };

        if (depth < 4) {
            fetchReplyCount();
        }
    }, [postId, comment.id, depth]);

    const handleVote = async (voteType) => {
        if (!isAuthenticated) {
            navigate(`${location.pathname}?modal=auth/login`);
            return;
        }

        const newLikeStatus = voteType === 'up' ? 'LIKE' : 'DISLIKE';
        try {
            if (likeStatus === newLikeStatus) {
                await removeLike(authFetch, comment.id);
                setLikeStatus('NONE');
                setScore(prev => prev + (voteType === 'up' ? -1 : 1));
            }
            else {
                await addLike(authFetch, comment.id, newLikeStatus);
                let scoreDelta = 0;
                if (likeStatus === 'LIKE') {
                    scoreDelta = voteType === 'up' ? 0 : -2;
                } else if (likeStatus === 'DISLIKE') {
                    scoreDelta = voteType === 'up' ? 2 : 0;
                } else {
                    scoreDelta = voteType === 'up' ? 1 : -1;
                }

                setLikeStatus(newLikeStatus);
                setScore(prev => prev + scoreDelta);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleReply = () => {
        if (!isAuthenticated) {
            navigate(`${location.pathname}?modal=auth/login`);
            return;
        }
        onReply(comment.id);
    };

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleEditSave = async () => {
        try {
            await patchComment(authFetch, comment.id, editContent);
            setCurrentContent(editContent);
            setIsEditing(false);
        } catch (err) {
            console.error('Error editing comment:', err);
        }
    };

    const handleEditCancel = () => {
        setEditContent(currentContent);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            await patchComment(authFetch, comment.id, '[This comment was deleted]');
            setCurrentContent('[This comment was deleted]');
            setEditContent('[This comment was deleted]');
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    if (loading) {
        return <div className={styles.commentLoading}>Loading comment...</div>;
    }

    if (!author) {
        return null;
    }

    const commentDate = new Date(comment.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const maxDepth = 5;
    const canReply = depth < maxDepth;

    return (
        <div className={styles.commentWrapper} style={{ '--depth': depth }}>
            <div className={styles.comment}>
                <div className={styles.votingSection}>
                    <button
                        className={`${styles.voteButton} ${likeStatus === 'LIKE' ? styles.voteButtonActive : ''}`}
                        onClick={() => handleVote('up')}
                        aria-label="Upvote"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 4L3 15H9V20H15V15H21L12 4Z" fill="currentColor" />
                        </svg>
                    </button>
                    <span className={styles.score}>{score}</span>
                    <button
                        className={`${styles.voteButton} ${likeStatus === 'DISLIKE' ? styles.voteButtonActive : ''}`}
                        onClick={() => handleVote('down')}
                        aria-label="Downvote"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 20L21 9H15V4H9V9H3L12 20Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                        <Link to={`/users/${author.id}`} className={styles.authorLink}>
                            <img
                                src={author.pfp ? `http://localhost:8080${author.pfp}` : "/src/assets/Mr_avatarko.png"}
                                alt={`${author.login}'s profile`}
                                className={styles.avatar}
                            />
                            <span className={styles.authorName}>{author.login}</span>
                        </Link>
                        <span className={styles.commentDate}>{commentDate}</span>
                    </div>

                    {isEditing ? (
                        <div className={styles.editSection}>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className={styles.editTextarea}
                                rows="3"
                            />
                            <div className={styles.editActions}>
                                <button onClick={handleEditSave} className={styles.saveButton}>
                                    Save
                                </button>
                                <button onClick={handleEditCancel} className={styles.cancelButton}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className={styles.commentText}>{currentContent}</p>
                    )}

                    <div className={styles.commentActions}>
                        {canReply && (
                            <button onClick={handleReply} className={styles.replyButton}>
                                Reply
                            </button>
                        )}
                        {replyCount > 0 && depth < maxDepth && (
                            <button onClick={handleToggleReplies} className={styles.showRepliesButton}>
                                {showReplies ? 'Hide' : 'Show'} replies ({replyCount})
                            </button>
                        )}
                        {isMe && !isEditing && (
                            <>
                                <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                                    Edit
                                </button>
                                <button onClick={handleDelete} className={styles.deleteButton}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showReplies && (
                <AnswerList
                    postId={postId}
                    parentId={comment.id}
                    depth={depth + 1}
                    onReply={onReply}
                />
            )}
        </div>
    );
}