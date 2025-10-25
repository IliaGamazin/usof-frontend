import { useState, useEffect } from 'react';
import {getPostComments, newPostComment} from '../../../services/CommentService.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router';
import Comment from './Comment.jsx';
import Pagination from '../../common/pagination/Pagination/Pagination.jsx';
import styles from './CommentList.module.css';
import {useAuthFetch} from "../../../services/Api.js";

export default function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [orderBy, setOrderBy] = useState('score');
    const [orderDir, setOrderDir] = useState('DESC');
    const [replyingTo, setReplyingTo] = useState(null);
    const [newComment, setNewComment] = useState('');

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const authFetch = useAuthFetch();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const data = await getPostComments(postId, page, 10, orderBy, orderDir, null);
                setComments(data.data);
                setPagination(data.pagination);
            } catch (err) {
                console.error('Error fetching comments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, page, orderBy, orderDir]);

    const handleReply = (commentId) => {
        setReplyingTo(commentId);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate(`${location.pathname}?modal=auth/login`);
            return;
        }

        if (!newComment.trim()) return;

        try {
            await newPostComment(authFetch, postId, newComment, replyingTo);

            setNewComment('');
            setReplyingTo(null);

            const data = await getPostComments(postId, page, 10, orderBy, orderDir, null);
            setComments(data.data);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleSortChange = (e) => {
        setOrderBy(e.target.value);
        setPage(1);
    };

    return (
        <div className={styles.commentSection}>
            <div className={styles.commentHeader}>
                <h2 className={styles.commentTitle}>
                    Comments {pagination && `(${pagination.total})`}
                </h2>
                <select
                    className={styles.sortSelect}
                    value={orderBy}
                    onChange={handleSortChange}
                >
                    <option value="score">Top</option>
                    <option value="created_at">Newest</option>
                </select>
            </div>

            <form onSubmit={handleSubmitComment} className={styles.commentForm}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
                    className={styles.commentInput}
                    rows="4"
                />
                <div className={styles.formActions}>
                    {replyingTo && (
                        <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className={styles.cancelButton}
                        >
                            Cancel Reply
                        </button>
                    )}
                    <button type="submit" className={styles.submitButton}>
                        {replyingTo ? 'Reply' : 'Comment'}
                    </button>
                </div>
            </form>

            {loading ? (
                <div className={styles.loading}>Loading comments...</div>
            ) : comments.length === 0 ? (
                <div className={styles.noComments}>
                    No comments yet. Be the first to comment!
                </div>
            ) : (
                <div className={styles.commentList}>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            depth={0}
                            onReply={handleReply}
                        />
                    ))}
                </div>
            )}

            {pagination && pagination.total_pages > 1 && (
                <Pagination
                    totalPages={pagination.total_pages}
                    currentPage={page}
                    setPage={setPage}
                />
            )}
        </div>
    );
}