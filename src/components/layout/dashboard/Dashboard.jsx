import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <Header />
            <main className={styles.content}>

            </main>
            <Footer />
        </div>
    );
}
