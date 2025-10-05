import Button from "../../common/Button.jsx";
import styles from "./Header.module.css";

import searchIcon from '../../../assets/Magnifying_glass_icon.svg';
import bellIcon from '../../../assets/Bell_icon.svg';
import pencilIcon from '../../../assets/Pencil_icon.svg';
import mangoIcon from '../../../assets/mango.svg';

export default function Header() {
    return (
        <header className={styles.header}>
            <ul className={styles.headerList}>
                <li className={styles.titleBlock}>
                    <h2 className={styles.title}>MangOverflow</h2>
                    <img className={styles.icon} src={mangoIcon} alt=""/>
                </li>
                <li>
                    <search className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={styles.searchInput}
                        />
                    </search>
                </li>
                <li className={styles.buttonBlock}>
                    <nav className={styles.buttonBar}>
                        <Button className={styles.svgButton}>
                            <img className={styles.icon} src={searchIcon} alt="search_icon.svg"/>
                        </Button>
                        <Button className={styles.svgButton}>
                            <img className={styles.icon} src={bellIcon} alt="search_icon.svg"/>
                        </Button>
                        <Button className={styles.writeButton}>
                            <img className={styles.icon} src={pencilIcon} alt="search_icon.svg"/>
                            <span>Write a post</span>
                        </Button>
                        <Button className={styles.authButton}>
                            Log in
                        </Button>
                    </nav>
                </li>
            </ul>
        </header>
    );
}
