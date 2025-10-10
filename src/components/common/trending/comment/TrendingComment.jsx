import Button from "../../button/Button.jsx";

import styles from "./TrendingComment.module.css"

import likeIcon from '/src/assets/Like_icon.svg'
import dislikeIcon from '/src/assets/Dislike_icon.svg'
import {Link} from "react-router";

export default function TrendingComment(
    {   userId, username, pfpUrl,
        commentableId, commentableType, commentable, comment, rating
    }) {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li>
                    <div className={styles.userContainer}>
                        <Link to={"/users/" + userId}>
                            <Button
                                onClick={() => window.scrollTo(0, 0)}
                                className={styles.pfpButton}
                            >
                                <img src={pfpUrl} alt="pfp"/>
                            </Button>
                        </Link>
                        <div>
                            <div className={styles.infoBlock}>
                                <h4>{username}</h4>
                                <h5 className={styles.commentableSpan}>
                                    under {commentableType === "COMMENT" ? "comment" : "post"}:
                                </h5>
                            </div>
                            <a className={styles.commentableLink} href={ `/${commentableType === "COMMENT" ? "comments" : "posts"}/` + commentableId }>{commentable}</a>
                        </div>
                    </div>
                </li>
                <li>
                    <p className={styles.commentParagraph}>{comment}</p>
                </li>
                <li>
                    <span className={styles.ratingSpan}>
                        <Button className={styles.reactButton}>
                            <img src={likeIcon} alt="like_icon.svg"/>
                        </Button>
                        <Button className={styles.reactButton}>
                            <img src={dislikeIcon} alt="like_icon.svg"/>
                        </Button>
                        <p>{rating}</p>
                    </span>
                </li>
            </ul>
        </div>
    );
}
