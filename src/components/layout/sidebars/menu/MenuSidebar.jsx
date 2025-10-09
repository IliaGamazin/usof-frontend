import { useState, useRef, useEffect } from 'react';

import Button from "../../../common/button/Button.jsx";
import styles from "./MenuSidebar.module.css";

import trendingIcon from "/src/assets/Trending_icon.svg"
import recentIcon from "/src/assets/Recent_icon.svg"
import ratingIcon from "/src/assets/Rating_icon.svg"
import favouriteIcon from "/src/assets/Favourite_icon.svg"
import followedIcon from "/src/assets/Followed_icon.svg"
import categoriesIcon from "/src/assets/Categories_icon.svg"
import myPostsIcon from "/src/assets/My_posts_icon.svg"

export default function MenuSidebar({className}) {
    return (
        <aside className={className}>
            <ul className={styles.list}>
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
                        <img className={styles.icon} src={categoriesIcon} alt="Categories_icon.svg"/>
                        <span>Categories</span>
                    </Button>
                </li>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={ratingIcon} alt="Rating_icon.svg"/>
                        <span>Rating</span>
                    </Button>
                </li>
            </ul>
            <ul className={styles.list}>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={favouriteIcon} alt="Favourite_icon.svg"/>
                        <span>Favourites</span>
                    </Button>
                </li>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={followedIcon} alt="Followed_icon.svg"/>
                        <span>Followed</span>
                    </Button>
                </li>
                <li>
                    <Button className={styles.menuButton}>
                        <img className={styles.icon} src={myPostsIcon} alt="My_posts_icon.svg"/>
                        <span>My posts</span>
                    </Button>
                </li>
            </ul>
        </aside>
    );
}
