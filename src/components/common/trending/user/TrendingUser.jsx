import Button from "../../button/Button.jsx";

import styles from "./TrendingUser.module.css"
import {Link} from "react-router";

export default function TrendingUser({place, id, username, pfpUrl, rating, posts}) {
    return (
        <div className={styles.container}>
            <h4>{place}</h4>
            <div className={styles.userContainer}>
                <Link to={"/users/" + id}>
                    <Button
                        onClick={() => window.scrollTo(0, 0)}
                        className={styles.pfpButton}
                    >
                        <img src={pfpUrl} alt=""/>
                    </Button>
                </Link>
                <div className={styles.infoBlock}>
                    <h4>{username}</h4>
                    <p>{rating} rating with {posts} {posts > 1 ? "posts" : "post"}</p>
                </div>
            </div>
        </div>
    );
}
