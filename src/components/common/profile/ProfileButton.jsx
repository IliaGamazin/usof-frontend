import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router";

import styles from "./ProfileButton.module.css"
import {getMe} from "../../../services/UserService.js";
import {useAuthFetch} from "../../../services/Api.js";
import {useAuth} from "../../../context/AuthContext.jsx";

export default function ProfileButton() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { isAuthenticated} = useAuth();

    useEffect(() => {
        const fetchMyData = async () => {
            try {
                setLoading(true);
                const userData = await getMe(authFetch);
                setUser(userData);
            }
            catch (err) {
                console.error('Failed to fetch user:', err);
                navigate("/*");
            }
            finally {
                setLoading(false);
            }
        };

        fetchMyData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Link to={`/users/${user.id}`}>
                <img
                    src={user.pfp ? `http://localhost:8080${user.pfp}` : "/src/assets/Mr_avatarko.png"}
                    alt="pfp.jpg">
                </img>
            </Link>
        </div>
    );
};
