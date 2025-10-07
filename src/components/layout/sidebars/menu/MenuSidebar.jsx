import { useState, useRef, useEffect } from 'react';

import Button from "../../../common/button/Button.jsx";
import styles from "./MenuSidebar.module.css";

import trendingIcon from "/src/assets/Trending_icon.svg"
import recentIcon from "/src/assets/Recent_icon.svg"

export default function MenuSidebar({className}) {
    return (
        <aside className={className}>
            <ul>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={trendingIcon} alt="Trending_icon.svg"/>
                        <span>Trending</span>
                    </Button>
                </li>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={recentIcon} alt="Recent_icon.svg"/>
                        <span>Recent</span>
                    </Button>
                </li>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={recentIcon} alt="Rating_icon.svg"/>
                        <span>Rating</span>
                    </Button>
                </li>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={recentIcon} alt="Favourites_icon.svg"/>
                        <span>Favourites</span>
                    </Button>
                </li>
            </ul>
            <ul>

            </ul>
        </aside>
    );
}
