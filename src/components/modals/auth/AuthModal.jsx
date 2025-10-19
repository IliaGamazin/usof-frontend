import {useSearchParams} from 'react-router-dom';
import {useState} from "react";
import {Link, useNavigate} from "react-router";

import Modal from '../../common/Modal/Modal.jsx';
import Button from "../../common/button/Button.jsx";

import mangoIcon from "../../../assets/mango.svg";
import styles from "./AuthModal.module.css";

import {login, signup} from "../../../services/AuthService.js";
import {useAuth} from "../../../context/AuthContext.jsx";

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAccessToken } = useAuth();
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await login(formData);
            console.log(result.access_token);
            setAccessToken(result.access_token);
            console.log('Signup successful!', result);
            navigate("/");
        }
        catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>Mangoflow</h2>
                <img className={styles.icon} src={mangoIcon} alt=""/>
            </div>
            <h2 className={styles.subtitle}>Welcome back!</h2>

            {error &&  (
                <h1>{error}</h1>
            )}

            <ul className={styles.list}>
                <li>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        placeholder="Login"
                        required
                    />
                </li>
                <li>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </li>
                <li>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </li>
                <li>
                    <Button
                        type="submit"
                        className={styles.submitButton}
                    >Log In</Button>
                </li>
            </ul>
            <label>
                Wanna <Link to="?modal=auth/signup">sign up</Link> instead?
            </label>
        </form>
    );
}

const SignupForm = () => {
    const navigate = useNavigate();
    const { setAccessToken } = useAuth();
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        password_confirmation: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        try {
            const result = await signup(formData);
            console.log(result.access_token);
            setAccessToken(result.access_token);
            console.log('Login successful!', result);
            navigate("/");
        }
        catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>Mangoflow</h2>
                <img className={styles.icon} src={mangoIcon} alt=""/>
            </div>
            <h2 className={styles.subtitle}>Join today!</h2>

            {error &&  (
                <h1>{error}</h1>
            )}

            <ul className={styles.list}>
                <li>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        placeholder="Login"
                        required
                    />
                </li>
                <li>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </li>
                <li className={styles.nameBlock}>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Firstname"
                        required
                    />
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Lastname"
                        required
                    />
                </li>
                <li>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </li>
                <li>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                    />
                </li>
                <li>
                    <Button
                        className={styles.submitButton}
                        type="submit"
                    >Create Account</Button>
                </li>
            </ul>
            <label>
                Wanna <Link to="?modal=auth/login">log in</Link> instead?
            </label>
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
