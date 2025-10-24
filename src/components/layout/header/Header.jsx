import { useState, useRef, useEffect } from 'react';
import Button from "../../common/button/Button.jsx";
import ProfileButton from "../../common/profile/ProfileButton.jsx";

import styles from "./Header.module.css";

import searchIcon from '../../../assets/Magnifying_glass_icon.svg';
import pencilIcon from '../../../assets/Pencil_icon.svg';
import mangoIcon from '../../../assets/mango.svg';
import {Link} from "react-router";
import {useAuth} from "../../../context/AuthContext.jsx";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const headerContainerRef = useRef(null);

    const {isAuthenticated} = useAuth();

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        }

        const headerElement = headerContainerRef.current;

        if (isSearchOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            if (headerElement) {
                headerElement.style.paddingRight = `${scrollbarWidth}px`;
            }

            document.addEventListener('mousedown', handleClickOutside);
            if (inputRef.current) inputRef.current.focus();

        }
        else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            if (headerElement) {
                headerElement.style.paddingRight = "";
            }
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            if (headerElement) {
                headerElement.style.paddingRight = "";
            }
        };
    }, [isSearchOpen]);

    return (
        <div ref={headerContainerRef} className={styles.container}>
            {isSearchOpen && (
                <div
                    className={styles.filter}
                    onClick={() => setIsSearchOpen(false)}
                />
            )}
            <header className={styles.header}>
                <ul className={styles.headerList}>
                    <li className={styles.titleBlock}>
                        <h2 className={styles.title}>Mangoflow</h2>
                        <img className={styles.icon} src={mangoIcon} alt=""/>
                    </li>
                    <li
                        ref={searchRef}
                        className={styles.searchWrapper}
                    >
                        {isSearchOpen && (
                            <search className={styles.searchContainer}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search..."
                                    className={styles.searchInput}
                                />
                            </search>
                        )}
                    </li>
                    <li className={styles.buttonBlock}>
                        <nav className={styles.buttonBar}>
                            <Button
                                className={styles.svgButton}
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            >
                                <img className={styles.icon} src={searchIcon} alt="search_icon.svg"/>
                            </Button>
                            <Link to={isAuthenticated ? "?modal=write" : "?modal=auth/login"}>
                                <Button className={styles.writeButton}>
                                    <img className={styles.icon} src={pencilIcon} alt="pencil_icon.svg"/>
                                    <span>Write</span>
                                </Button>
                            </Link>
                            {isAuthenticated ?
                                <ProfileButton/>
                                :
                                <Link to="?modal=auth/login">
                                    <Button className={styles.authButton}>
                                        Log in
                                    </Button>
                                </Link>
                            }
                        </nav>
                    </li>
                </ul>
            </header>
        </div>
    );
}
