import React from 'react';
import {useParams} from "react-router";
import { useState, useEffect } from 'react';
import {getMe, getUser} from "../../../services/UserService.js";
import {useNavigate} from "react-router";

import styles from "./UserPage.module.css";
import {useAuthFetch} from "../../../services/Api.js";
import {useAuth} from "../../../context/AuthContext.jsx";

export default function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMe, setIsMe] = useState(false);
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const { isAuthenticated} = useAuth();

    const fetchUserData = async (id) => {
        try {
            setLoading(true);
            const userData = await getUser(id);
            if (isAuthenticated) {
                const myData = await getMe(authFetch);
                if (userData.id === myData.id) {
                    setIsMe(true);
                }
                console.log(myData);
            }
            setUser(userData);
        }
        catch (err) {
            console.log(err);
            navigate("/*")
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUserData(id);
        }
        else {
            setLoading(false);
        }
    }, [id]);

    if (loading) return <div>Loading user...</div>;
    if (!user) return <div>No user found</div>;
    return (
        <div className={styles.container}>
            <div className={styles.profileContent}>
                <img
                    src={user.pfp ? `http://localhost:8080${user.pfp}` : "/src/assets/Mr_avatarko.png"}
                    alt="Profile picture"
                />
                <div className={styles.credentials}>
                    <div className={styles.nameBlock}>
                        <h3 className={styles.nickname}>{user.login}</h3>
                        <span className={styles.role}>[{user.role}]</span>
                    </div>

                    <p className={styles.fullNameLabel}>Full name:</p>
                    <h4 className={styles.name}>
                        {user.firstname} {user.lastname}
                    </h4>
                </div>
            </div>

            <div className={styles.statsBlock}>
                <p>
                    Rating: <span className={styles.ratingValue}>{user.rating}</span>
                </p>
                <p className={styles.joinDate}>
                    Joined {new Date(user.created_at).toLocaleDateString()}
                </p>
            </div>
            {isMe && (
                <div className={styles.personalBlock}>
                    <h1>me</h1>
                </div>
            )}
        </div>
    );
}
