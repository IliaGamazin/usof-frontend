import { useState, useRef, useEffect } from 'react';

import styles from "./FeedSidebar.module.css";
import TrendingUser from "../../../common/trending/user/TrendingUser.jsx";
import TrendingComment from "../../../common/trending/comment/TrendingComment.jsx";

export default function FeedSidebar({className}) {
    return (
        <aside className={className}>
            <ul className={styles.list}>
                <li className={styles.listElement}>
                    <span className={styles.listSpan}>Trending comments</span>
                    <TrendingComment
                        username={"Test User Lorem Ipsum dolor sit amet"}
                        comment={"Lorem ipsum dolor sit amet consetetur "}
                        commentableType={"COMMENT"}
                        commentable={"Dolor sit amet dolor sit amet"}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        rating={190}
                    />
                    <TrendingComment
                        username={"Test User"}
                        comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo est nec " +
                            "tortor vehicula, sit amet porta augue laoreet. Pellentesque sed nibh a elit fringill" +
                            "a euismod quis vitae dolor. Pellentesque augue purus, facilisis sit amet."}
                        commentableType={"POST"}
                        commentable={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo est nec tortor vehicula"}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        rating={190}
                    />
                    <a className={styles.seeAllLink} href="#">See all</a>
                </li>
                <li className={styles.listElement}>
                    <span className={styles.listSpan}>Best bloggers</span>
                    <TrendingUser
                        username={"Test User Lorem Ipsum dolor sit amet"}
                        place={1}
                        rating={5000000000}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        posts={500}
                    />
                    <TrendingUser
                        username={"Giga"}
                        place={2}
                        rating={499}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        posts={1}
                    />
                    <TrendingUser
                        username={"VladXXXBlessTentacion"}
                        place={3}
                        rating={234}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        posts={221}
                    />
                    <a className={styles.seeAllLink} href="#">See all</a>
                </li>
                <li className={styles.listElement}>
                    <span className={styles.listSpan}>Idk</span>
                </li>
            </ul>
            <ul>

            </ul>
        </aside>
    );
}
