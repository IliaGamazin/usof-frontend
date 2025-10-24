
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../common/button/Button.jsx";
import mangoIcon from "../../../assets/mango.svg";
import styles from "./ResetPassword.module.css";

import { confirmResetPassword } from "../../../services/AuthService.js";

export default function ResetPassword() {
    const { token } = useParams();
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
        setIsLoading(true);

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            setIsLoading(false);
            return;
        }

        try {
            await confirmResetPassword(formData.password, token);
            setSuccess(true);
            window.location.href = "http://localhost:5173/";
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.container}>
                <div className={styles.successMessage}>
                    <div className={styles.titleBlock}>
                        <h2 className={styles.title}>Mangoflow</h2>
                        <img className={styles.icon} src={mangoIcon} alt=""/>
                    </div>
                    <h2 className={styles.subtitle}>Password Reset Successful!</h2>
                    <p>Redirecting you to the login page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.titleBlock}>
                    <h2 className={styles.title}>Mangoflow</h2>
                    <img className={styles.icon} src={mangoIcon} alt=""/>
                </div>
                <h2 className={styles.subtitle}>Reset Your Password</h2>

                <ul className={styles.list}>
                    <li>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="New Password"
                            required
                            minLength="8"
                        />
                    </li>
                    <li>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                            required
                            minLength="8"
                        />
                    </li>
                    <li>
                        <Button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </li>
                </ul>

                {error && (
                    <h3 className={styles.error}>{error}</h3>
                )}

                <label>
                    Remember your password? <a href="?modal=auth/login">Log in</a>
                </label>
            </form>
        </div>
    );
};
