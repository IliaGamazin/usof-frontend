import { useState, useRef, useEffect } from 'react';

import styles from "./FeedSidebar.module.css";
import TrendingUser from "../../../common/trending/user/TrendingUser.jsx";

export default function FeedSidebar({className}) {
    return (
        <aside className={className}>
            <ul className={styles.list}>
                <li className={styles.listElement}>
                    <span className={styles.listSpan}>Trending comments</span>
                </li>
                <li className={styles.listElement}>
                    <span className={styles.listSpan}>Best bloggers</span>
                    <TrendingUser
                        username={"testUser222222222222222222"}
                        place={1}
                        rating={5000000000}
                        pfp={"/src/assets/FELV-cat.jpg"}
                        posts={500}
                    />
                    <TrendingUser
                        username={"Giga"}
                        place={2}
                        rating={499}
                        pfp={"/src/assets/FELV-cat.jpg"}
                        posts={1}
                    />
                    <TrendingUser
                        username={"VladXXXBlessTentacion"}
                        place={3}
                        rating={234}
                        pfp={"/src/assets/FELV-cat.jpg"}
                        posts={221}
                    />
                    <a href="">See all</a>
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
