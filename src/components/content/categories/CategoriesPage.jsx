import React, {useEffect, useState} from 'react';
import styles from "./CategoriesPage.module.css";
import {getCategories} from "../../../services/CategoryService.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import CategoryPreview from "../../common/previews/category/CategoryPreview.jsx";
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";
import DataFilter from "../../common/pagination/DataFIlter.jsx";

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

    if (loading) {
        return <PagePlaceholder type="loading" message="Loading categories..." />;
    }

    if (!categories) {
        return (
            <PagePlaceholder
                type="not-found"
                message="No categories found or an error occurred"
            />
        );
    }

    window.scrollTo(0, 0);

    const allowedSortParams = [
        { value: "id", label: "Id" },
        { value: "title", label: "Title" },
    ];

    return (
        <>
            <DataFilter
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                orderDir={orderDir}
                setOrderDir={setOrderDir}
                setPage={setPage}
                allowedSortParams={allowedSortParams}
            />
            <div className={styles.container}>
                <div>
                    {categories?.length > 0 && (
                        <div className={styles.categoryGrid}>
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
