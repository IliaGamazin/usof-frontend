import { useState, useRef, useEffect } from 'react';

import Button from "../../common/button/Button.jsx";
import styles from "./Header.module.css";

import searchIcon from '../../../assets/Magnifying_glass_icon.svg';
import bellIcon from '../../../assets/Bell_icon.svg';
import pencilIcon from '../../../assets/Pencil_icon.svg';
import mangoIcon from '../../../assets/mango.svg';

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        }

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            if (inputRef.current) inputRef.current.focus();
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = "";
        };
    }, [isSearchOpen]);

    return (
        <div className={styles.container}>
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
                            <Button className={styles.svgButton}>
                                <img className={styles.icon} src={bellIcon} alt="bell_icon.svg"/>
                            </Button>
                            <Button className={styles.writeButton}>
                                <img className={styles.icon} src={pencilIcon} alt="pencil_icon.svg"/>
                                <span>Write</span>
                            </Button>
                            <Button className={styles.authButton}>
                                Log in
                            </Button>
                        </nav>
                    </li>
                </ul>
            </header>
        </div>
    );
}
