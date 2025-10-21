import {Link} from "react-router";

import styles from "./NotFound.module.css"

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Oopsie-Woopsie!</h1>
            <h2>This page does not exist</h2>
            <div className={styles.actionBlock}>
                <Link to="/login">Back</Link>
                <Link to="/login">Report an issue</Link>
            </div>
            <h1 className={styles.e404}>404</h1>
        </div>
    );
}
