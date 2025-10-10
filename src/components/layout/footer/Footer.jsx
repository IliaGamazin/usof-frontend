import styles from "./Footer.module.css";
import githubIcon from '/src/assets/Github_icon.svg';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.aboutSection}>
                    <h3 className={styles.logo}>USOF</h3>
                    <p>
                        This project is a solution named <strong>Mangoflow</strong>, developed by Ilia Gamazin.
                        It is an open-source submission for a challenge within the Innovation Campus
                        web full-stack programme.
                    </p>
                </div>

                <div className={styles.linksSection}>
                    <h4>Project</h4>
                    <ul>
                        <li><a href="https://github.com/IliaGamazin/usof-frontend">Source Code</a></li>
                        <li><a href="https://github.com/IliaGamazin/usof-backend">Api Reference</a></li>
                        <li><a href="https://github.com/IliaGamazin/usof-frontend/issues">Report an Issue</a></li>
                        <li><a href="https://github.com/IliaGamazin/usof-frontend/pulls">Contribute</a></li>
                    </ul>
                </div>

                <div className={styles.contactSection}>
                    <h4>Connect with me</h4>
                    <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                        <img src={githubIcon} alt="GitHub Icon" />
                        Ilia Gamazin on GitHub
                    </a>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} Mangoflow by Ilia Gamazin. All rights reserved.</p>
            </div>
        </footer>
    );
}
