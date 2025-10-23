import React, {useEffect, useState} from 'react';
import {getUsers} from "../../../services/UserService.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import UserPreview from "../../common/previews/user/UserPreview.jsx";

import styles from "./UsersPage.module.css";
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";

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

    if (loading) {
        return <PagePlaceholder type="loading" message="Loading users..." />;
    }

    if (!users) {
        return (
            <PagePlaceholder
                type="not-found"
                message="No users found or an error occurred"
            />
        );
    }

    window.scrollTo(0, 0);

    return (
        <div className={styles.container}>
            <div>
                {users?.length > 0 && (
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
            {pagination?.total_pages > 1 && (
                <Pagination
                    totalPages={pagination.total_pages}
                    currentPage={page}
                    setPage={setPage}
                />
            )}
        </div>
    );
}
