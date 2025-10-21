import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {getUsers} from "../../../services/UserService.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import UserPreview from "../../common/previews/user/UserPreview.jsx";

import styles from "./UsersPage.module.css";

export default function UsersPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [orderBy, setOrderBy] = useState("rating");
    const [orderDir, setOrderDir] = useState("DESC");

    const fetchUsersData = async () => {
        try {
            setLoading(true);
            const usersData = await getUsers(
                page, limit, orderBy, orderDir
            );
            console.log(usersData)
            setUsers(usersData.data);
            setPagination(usersData.pagination);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
       fetchUsersData();
    }, [page, limit, orderBy, orderDir]);

    if (loading) return <div>Loading users...</div>;
    if (!users) return <div>No users found</div>;

    return (
        <div className={styles.container}>
            <div>
                <h1>All Users</h1>
                {users && users.length > 0 && (
                    <div className={styles.userGrid}>
                        {users.map((user) => (
                            <UserPreview
                                key={user.id}
                                id={user.id}
                                rating={user.rating}
                                username={user.login}
                                pfp={user.profile_picture}
                            />
                        ))}
                    </div>
                )}
            </div>
            {pagination.total_pages > 1 && (
                <Pagination
                    totalPages={pagination.total_pages}
                    currentPage={page}
                    setPage={setPage}
                />
            )}
        </div>
    );
}
