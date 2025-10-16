import TrendingUser from "../../../common/trending/user/TrendingUser.jsx";
import TrendingComment from "../../../common/trending/comment/TrendingComment.jsx";

import styles from "./FeedSidebar.module.css";

export default function FeedSidebar({className}) {
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
                <li className={styles.listElement}>
                    <span className={styles.listSpan}>Best bloggers</span>
                    <TrendingUser
                        id={12387}
                        username={"Test User Lorem Ipsum dolor sit amet"}
                        place={1}
                        rating={5000000000}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        posts={500}
                    />
                    <TrendingUser
                        id={21312}
                        username={"Giga"}
                        place={2}
                        rating={499}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        posts={1}
                    />
                    <TrendingUser
                        id={2312}
                        username={"VladXXXBlessTentacion"}
                        place={3}
                        rating={234}
                        pfpUrl={"/src/assets/FELV-cat.jpg"}
                        posts={221}
                    />
                    <a className={styles.seeAllLink} href="/users">See all</a>
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
