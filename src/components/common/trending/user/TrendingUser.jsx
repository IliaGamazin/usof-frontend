import Button from "../../button/Button.jsx";

import styles from "./TrendingUser.module.css"
import {Link} from "react-router";

export default function TrendingUser({place, id, username, pfpUrl, rating}) {
    return (
        <div className={styles.container}>
            <h4>{place}</h4>
            <div className={styles.userContainer}>
                <Link to={"/users/" + id}>
                    <Button
                        onClick={() => window.scrollTo(0, 0)}
                        className={styles.pfpButton}
                    >
                        <img
                            src={pfpUrl ? `http://localhost:8080${pfpUrl}` : "/src/assets/Mr_avatarko.png"}
                            alt={`${username}'s profile picture`}
                        />
                    </Button>
                </Link>
                <div className={styles.infoBlock}>
                    <h4>{username}</h4>
                    <p>Rating: {rating}</p>
                </div>
            </div>
        </div>
    );
}
