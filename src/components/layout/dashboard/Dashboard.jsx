import {Outlet} from 'react-router-dom';
import {useSearchParams} from "react-router";

import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import MenuSidebar from "../sidebars/menu/MenuSidebar.jsx";
import FeedSidebar from "../sidebars/feed/FeedSidebar.jsx";
import AuthModal from "../../modals/auth/AuthModal.jsx";
import WriteModal from "../../modals/write/WriteModal.jsx";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const modalType = searchParams.get('modal');

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

            {modalType === 'auth/login' && <AuthModal type="login" />}
            {modalType === 'auth/signup' && <AuthModal type="signup" />}
            {modalType === 'write' && <WriteModal/>}
        </div>
    );
}
