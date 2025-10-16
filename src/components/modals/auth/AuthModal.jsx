import {useSearchParams} from 'react-router-dom';
import {Link} from "react-router";

import Modal from '../../common/Modal/Modal.jsx';

import styles from "./AuthModal.module.css";
import mangoIcon from "../../../assets/mango.svg";

const LoginForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>Mangoflow</h2>
                <img className={styles.icon} src={mangoIcon} alt=""/>
            </div>
            <h2 className={styles.subtitle}>Welcome back!</h2>

            <ul className={styles.list}>
                <li>
                    <input type="text" id="login" placeholder="Login" />
                </li>
                <li>
                    <input type="email" id="email" placeholder="Email" />
                </li>
                <li>
                    <input type="password" id="password" placeholder="Password" />
                </li>
                <li>
                    <button type="submit">Log In</button>
                </li>
            </ul>
            <Link to="?modal=auth/signup">Wanna sign up instead?</Link>
        </form>
    );
}

const SignupForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>Mangoflow</h2>
                <img className={styles.icon} src={mangoIcon} alt=""/>
            </div>
            <h2 className={styles.subtitle}>Join today!</h2>

            <ul className={styles.list}>
                <li>
                    <input type="text" id="login" placeholder="Login" />
                </li>
                <li>
                    <input type="email" id="email" placeholder="Email" />
                </li>
                <li className={styles.nameBlock}>
                    <input type="text" id="first-name" placeholder="Firstname" />
                    <input type="text" id="last-name" placeholder="Lastname" />
                </li>
                <li>
                    <input type="password" id="password" placeholder="Password" />
                </li>
                <li>
                    <input type="password" id="confirm-password" placeholder="Confirm password" />
                </li>
                <li>
                    <button type="submit">Create Account</button>
                </li>
            </ul>

            <Link to="?modal=auth/login">Wanna sign in instead?</Link>
        </form>
    );
}



export default function AuthModal({ type }) {
    const [, setSearchParams] = useSearchParams();

    const handleClose = () => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.delete('modal');
        setSearchParams(newParams);
    };

    return (
        <Modal onClose={handleClose} contentClassName={styles.authContent}>
            {type === 'login' && <LoginForm />}
            {type === 'signup' && <SignupForm />}
        </Modal>
    );
}