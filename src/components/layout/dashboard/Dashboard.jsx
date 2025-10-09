import { Outlet } from 'react-router-dom';

import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

import styles from "./Dashboard.module.css";
import MenuSidebar from "../sidebars/menu/MenuSidebar.jsx";
import FeedSidebar from "../sidebars/feed/FeedSidebar.jsx";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <Header />
            <div className={styles.dashboardContent}>
                <MenuSidebar className={styles.menuSidebar}/>
                <main className={styles.content}>
                    <Outlet />
                </main>
                <FeedSidebar className={styles.feedSidebar}/>
            </div>
            <Footer />
        </div>
    );
}
