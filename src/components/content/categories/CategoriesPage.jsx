import React, {useEffect, useState} from 'react';
import styles from "../users/UsersPage.module.css";
import {getCategories} from "../../../services/CategoryService.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import CategoryPreview from "../../common/previews/category/CategoryPreview.jsx";

export default function CategoriesPage() {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [orderBy, setOrderBy] = useState("title");
    const [orderDir, setOrderDir] = useState("DESC");

    const fetchCategoriesData = async () => {
        try {
            setLoading(true);
            const categoriesData = await getCategories(
                page, limit, orderBy, orderDir
            );
            console.log(categoriesData)
            setCategories(categoriesData.data);
            setPagination(categoriesData.pagination);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchCategoriesData();
    }, [page, limit, orderBy, orderDir]);

    if (loading) return <div>Loading categories...</div>;
    if (!categories) return <div>No users found</div>;

    return (
        <div className={styles.container}>
            <div>
                <h1>All Categories</h1>
                {categories && categories.length > 0 && (
                    <div className={styles.userGrid}>
                        {categories.map((category) => (
                            <CategoryPreview
                                key={category.id}
                                id={category.id}
                                title={category.title}
                                description={category.description}
                            />
                        ))}
                    </div>
                )}
            </div>
            {pagination && pagination.total_pages && pagination.total_pages > 1 && (
                <Pagination
                    totalPages={pagination.total_pages}
                    currentPage={page}
                    setPage={setPage}
                />
            )}
        </div>
    );
}
