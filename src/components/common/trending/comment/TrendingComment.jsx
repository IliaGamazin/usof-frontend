import Button from "../../button/Button.jsx";

import styles from "./TrendingComment.module.css"

import {Link} from "react-router";
import {useEffect, useState} from "react";
import {getPost} from "../../../../services/PostService.js";
import {getUser} from "../../../../services/UserService.js";

export default function TrendingComment(
    {   userId,
        postId, comment, rating
    }) {

    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCommentData = async (userId, postId) => {
        try {
            setLoading(true);
            const postData = await getPost(postId);
            const authorData = await getUser(userId);
            setAuthor(authorData);
            setPost(postData);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommentData(userId, postId);
    }, [userId, postId]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li>
                    <div className={styles.userContainer}>
                        <Link to={"/users/" + author.id}>
                            <Button
                                onClick={() => window.scrollTo(0, 0)}
                                className={styles.pfpButton}
                            >
                                <img
                                    src={author.pfp ? `http://localhost:8080${author.pfp}` : "/src/assets/Mr_avatarko.png"}
                                    alt={`${author.login}'s profile`}
                                />
                            </Button>
                        </Link>
                        <div>
                            <div className={styles.infoBlock}>
                                <h4>{author.login}</h4>
                                <h5 className={styles.commentableSpan}>
                                    under post:
                                </h5>
                            </div>
                            <a
                                className={styles.commentableLink}
                                href={ `/posts/` + post.post.id }
                            >
                                {post.post.title}
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <p className={styles.commentParagraph}>{comment}</p>
                </li>
                <li>
                    <span className={styles.ratingSpan}>
                        <p>Score: {rating}</p>
                    </span>
                </li>
            </ul>
        </div>
    );
}
