import React from 'react';
import {Link, useParams} from "react-router";
import { useState, useEffect } from 'react';
import {getMe, getUser, patchUser, setAvatar} from "../../../services/UserService.js";
import {getPosts} from "../../../services/PostService.js";

import styles from "./UserPage.module.css";
import {useAuthFetch} from "../../../services/Api.js";
import {useAuth} from "../../../context/AuthContext.jsx";
import PostPreview from "../../common/previews/post/PostPreview.jsx";
import Pagination from "../../common/pagination/Pagination/Pagination.jsx";
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";
import ShareButton from "../../common/share/ShareButton.jsx";
import Button from "../../common/button/Button.jsx";
import { logout, resetPassword } from '../../../services/AuthService.js';
import DataFilter from "../../common/pagination/DataFilter/DataFilter.jsx";
import CategoryFilter from "../../common/pagination/CategoryFilter/CategoryFilter.jsx";

export default function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMe, setIsMe] = useState(false);
    const authFetch = useAuthFetch();
    const { isAuthenticated } = useAuth();

    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [orderBy, setOrderBy] = useState("score");
    const [orderDir, setOrderDir] = useState("DESC");

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        login: '',
        firstname: '',
        lastname: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarKey, setAvatarKey] = useState(0);

    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                setIsMe(false);
                setLoading(true);
                const userData = await getUser(id);
                setUser(userData);
                setEditForm({
                    login: userData.login,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                });
                if (isAuthenticated) {
                    const myData = await getMe(authFetch);
                    if (userData.id === myData.id) {
                        setIsMe(true);
                    }
                }
                const postData = await getPosts(
                    page,
                    limit,
                    orderBy,
                    orderDir,
                    categories.map((category) => category.id),
                    id
                );
                setPosts(postData.data);
                setPagination(postData.pagination);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData(id)
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }

    }, [page, limit, orderBy, orderDir, categories, id]);

    const handleLogout = async () => {
        try {
            await logout(authFetch);
            window.location.href = '/';
        }
        catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            let editedUser = await patchUser(authFetch, id, editForm);
            editedUser.pfp = editedUser.profile_picture;
            setUser(editedUser);
            if (avatarFile) {
                await setAvatar(authFetch, avatarFile);
            }
            setIsEditing(false);
        }
        catch (err) {
            setError(err.message);
        }
    };

    const handleCancelEdit = () => {
        setEditForm({
            login: user.login,
            firstname: user.firstname,
            lastname: user.lastname,
        });
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        setAvatarKey(prev => prev + 1);
        setError(null);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleResetPassword = async () => {
        try {
            await resetPassword(authFetch, user.email);
            window.location.href = '/';
        }
        catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const removeAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview(null);
        setAvatarKey(prev => prev + 1);
    };

    if (loading) {
        return <PagePlaceholder type="loading" message="Loading user profile..." />;
    }

    if (!user) {
        return (
            <PagePlaceholder
                type="not-found"
                message="User not found or an error occurred"
            />
        );
    }

    window.scrollTo(0, 0);

    const allowedSortParams = [
        { value: "id", label: "Id" },
        { value: "title", label: "Title" },
        { value: "created_at", label: "Publication date" },
        { value: "score", label: "Score" },
    ];

    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.profileContent} ${isEditing ? styles.centered : ''}`}>
                    <div className={styles.avatarSection}>
                        <img
                            src={avatarPreview || (user.pfp ? `http://localhost:8080${user.pfp}` : "/src/assets/Mr_avatarko.png")}
                            alt="Profile picture"
                            className={styles.profileImage}
                        />
                        {isEditing && (
                            <div className={styles.avatarUpload}>
                                <label className={styles.avatarUploadLabel}>
                                    Change Avatar
                                    <input
                                        key={avatarKey}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className={styles.avatarInput}
                                    />
                                </label>
                                {avatarPreview && (
                                    <Button
                                        className={styles.removeAvatarButton}
                                        onClick={removeAvatar}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles.credentials}>
                        {isEditing ? (
                            <div>
                                <form onSubmit={handleEditSubmit} className={styles.editForm}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Login</label>
                                        <input
                                            type="text"
                                            value={editForm.login}
                                            onChange={(e) => setEditForm({...editForm, login: e.target.value})}
                                            className={styles.formInput}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>First Name</label>
                                        <input
                                            type="text"
                                            value={editForm.firstname}
                                            onChange={(e) => setEditForm({...editForm, firstname: e.target.value})}
                                            className={styles.formInput}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Last Name</label>
                                        <input
                                            type="text"
                                            value={editForm.lastname}
                                            onChange={(e) => setEditForm({...editForm, lastname: e.target.value})}
                                            className={styles.formInput}
                                        />
                                    </div>
                                    <div className={styles.formActions}>
                                        <Button type="submit" className={styles.saveButton}>
                                            Save Changes
                                        </Button>
                                        <Button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                                {error && (
                                    <h3 className={styles.error}>{error}</h3>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={styles.nameBlock}>
                                    <h3 className={styles.nickname}>{user.login}</h3>
                                    <span className={styles.role}>[{user.role}]</span>
                                </div>
                                <p className={styles.fullNameLabel}>Full name:</p>
                                <h4 className={styles.name}>
                                    {user.firstname} {user.lastname}
                                </h4>
                            </>
                        )}
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

                <div className={styles.actionsBlock}>
                    <ShareButton />
                    {isMe && (
                        <div className={styles.personalActions}>
                            {isMe && !isEditing && (
                                <Button
                                    className={styles.editButton}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </Button>
                            )}
                            <Button onClick={handleResetPassword} className={styles.resetPasswordButton}>
                                Reset Password
                            </Button>
                            <Button onClick={handleLogout} className={styles.logoutButton}>
                                Logout
                            </Button>
                        </div>
                    )}
                </div>

                {isMe && user.role === "ADMIN" && (
                    <div className={styles.adminBlock}>
                        <Link
                            to="http://localhost:8080/admin"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={styles.adminLink}
                        >
                            Admin panel
                        </Link>
                    </div>
                )}
            </div>
            <div>
                <div className={styles.filterBlock}>
                    <DataFilter
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        orderDir={orderDir}
                        setOrderDir={setOrderDir}
                        setPage={setPage}
                        allowedSortParams={allowedSortParams}
                    />
                    <CategoryFilter
                        selectedCategories={categories}
                        setSelectedCategories={setCategories}
                    />
                </div>
                {posts?.length > 0 ? (
                    <div>
                        <div>
                            {posts.map(post => (
                                <PostPreview
                                    key={post.id}
                                    author_id={post.author_id}
                                    id={post.id}
                                    title={post.title}
                                    content={post.content}
                                    score={post.score}
                                    createdAt={post.created_at}
                                    categories={post.categories}
                                    withLink={false}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <h2 className={styles.emptyTitle}>This user has no posts with these filters yet!</h2>
                        {isMe && (
                            <h3 className={styles.emptySubtitle}>
                                Want to <Link to="?modal=write" className={styles.createLink}>create</Link> one?
                            </h3>
                        )}
                    </div>
                )}
            </div>

                {pagination?.total_pages > 1 && (
                    <Pagination
                        totalPages={pagination.total_pages}
                        currentPage={page}
                        setPage={setPage}
                    />
                )}
        </>
    );
}
