import TrendingUser from "../../../common/trending/user/TrendingUser.jsx";
import TrendingComment from "../../../common/trending/comment/TrendingComment.jsx";

import styles from "./FeedSidebar.module.css";
import React, {useEffect, useState} from "react";
import {getUsers} from "../../../../services/UserService.js";
import SidebarPlaceholder from "../../../common/placeholder/SidebarPlaceholder.jsx";
import {getComments} from "../../../../services/CommentService.js";

export default function FeedSidebar({className}) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const page = 1;
    const limit = 3;
    const orderBy = "rating";
    const orderDir= "DESC";

    const fetchUsersData = async () => {
        try {
            setLoading(true);
            const usersData = await getUsers(
                page, limit, orderBy, orderDir
            );
            setUsers(usersData.data);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchCommentsData = async () => {
        try {
            setLoading(true);
            const commentsData = await getComments(
                page, limit, "score", orderDir
            );
            setComments(commentsData.data);
            console.log(commentsData.data)
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, [page, limit, orderBy, orderDir]);

    useEffect(() => {
        fetchCommentsData();
    }, [page, limit, orderBy, orderDir]);


    if (loading) {
        return (
            <aside className={className}>
                <div className={styles.listElement}>
                    <SidebarPlaceholder type="loading" message="Loading sidebar..." />
                </div>
            </aside>
        );
    }

    if (!users) {
        return (
            <aside className={className}>
                <div className={styles.listElement}>
                    <SidebarPlaceholder type="error" message="Failed to load sidebar" />
                </div>
            </aside>
        );
    }

    return (
        <aside className={className}>
            <ul className={styles.list}>
                {comments?.length > 0 && (
                    <li className={styles.listElement}>
                        <span className={styles.listSpan}>Trending comments</span>
                        {comments.map((comment) => (
                            <TrendingComment
                                key={comment.id}
                                userId={comment.author_id}
                                comment={comment.content}
                                rating={comment.score}
                                postId={comment.post_id}
                            />
                        ))}
                    </li>
                )}
                {users?.length > 0 && (
                    <li className={styles.listElement}>
                        <span className={styles.listSpan}>Best bloggers</span>
                        {users.map((user, index) => (
                            <TrendingUser
                                place={index + 1}
                                key={user.id}
                                id={user.id}
                                rating={user.rating}
                                username={user.login}
                                pfpUrl={user.profile_picture}
                            />
                        ))}
                        <a className={styles.seeAllLink} href="/users">See all</a>
                    </li>
                )}
            </ul>
        </aside>
    );
}
