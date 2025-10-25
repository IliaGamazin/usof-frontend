import { useState, useEffect } from 'react';
import { getPostComments } from '../../../services/CommentService.js';
import Comment from './Comment.jsx';
import styles from './AnswerList.module.css';

export default function AnswerList({ postId, parentId, depth, onReply, setReplyCount }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                setLoading(true);
                const data = await getPostComments(postId, 1, 10, 'created_at', 'ASC', parentId);
                setComments(data.data);
                setPagination(data.pagination);
                if (setReplyCount) {
                    setReplyCount(data.pagination.total);
                }
            } catch (err) {
                console.error('Error fetching replies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReplies();
    }, [postId, parentId]);

    if (loading) {
        return <div className={styles.loading}>Loading replies...</div>;
    }

    if (comments.length === 0) {
        return null;
    }

    return (
        <div className={styles.answerList}>
            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    depth={depth}
                    onReply={onReply}
                />
            ))}
        </div>
    );
}
