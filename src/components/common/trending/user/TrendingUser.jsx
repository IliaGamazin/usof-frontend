import styles from "./TrendingUser.module.css"
import Button from "../../button/Button.jsx";

export default function TrendingUser({place, username, pfp, rating, posts}) {
    return (
        <div className={styles.container}>
            <h4>{place}</h4>
            <div className={styles.userContainer}>
                <Button className={styles.pfpButton}>
                    <img src={pfp} alt=""/>
                </Button>
                <div className={styles.infoBlock}>
                    <h4>{username}</h4>
                    <p>{rating} rating with {posts} {posts > 1 ? "posts" : "post"}</p>
                </div>
            </div>
        </div>
    );
}
