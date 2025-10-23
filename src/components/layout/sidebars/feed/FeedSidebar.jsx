import TrendingUser from "../../../common/trending/user/TrendingUser.jsx";
import TrendingComment from "../../../common/trending/comment/TrendingComment.jsx";

import styles from "./FeedSidebar.module.css";
import React, {useEffect, useState} from "react";
import {getUsers} from "../../../../services/UserService.js";
import SidebarPlaceholder from "../../../common/placeholder/SidebarPlaceholder.jsx";

export default function FeedSidebar({className}) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);

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
            setPagination(usersData.pagination);
            console.log(usersData.data);
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
                <li className={styles.listElement}>
                    <span className={styles.listSpan}>Trending comments</span>
                    <TrendingComment
                        userId={"3123"}
                        username={"Test User Lorem Ipsum dolor sit amet"}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}

                        commentableId={"129"}
                        commentableType={"COMMENT"}
                        commentable={"Dolor sit amet dolor sit amet"}

                        comment={"Lorem ipsum dolor sit amet consetetur "}
                        rating={190}
                    />
                    <TrendingComment
                        userId={"1123"}
                        username={"Test User"}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}

                        commentableId={"119"}
                        commentableType={"POST"}
                        commentable={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo est nec tortor vehicula"}

                        comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo est nec " +
                            "tortor vehicula, sit amet porta augue laoreet. Pellentesque sed nibh a elit fringill" +
                            "a euismod quis vitae dolor. Pellentesque augue purus, facilisis sit amet."}
                        rating={190}
                    />
                    <a className={styles.seeAllLink} href="/comments">See all</a>
                </li>
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
