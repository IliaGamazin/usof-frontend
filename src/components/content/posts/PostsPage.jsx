import React, {useEffect, useState} from 'react';
import {getPosts} from "../../../services/PostService.js";
import Pagination from "../../common/pagination/Pagination/Pagination.jsx";
import PostPreview from "../../common/previews/post/PostPreview.jsx";

import styles from "./PostsPage.module.css"
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";
import DataFilter from "../../common/pagination/DataFilter/DataFilter.jsx";
import CategoryFilter from "../../common/pagination/CategoryFilter/CategoryFilter.jsx";
import {Link} from "react-router";
import {useAuth} from "../../../context/AuthContext.jsx";

export default function PostsPage({order = "score"}) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [orderBy, setOrderBy] = useState(order);
    const [orderDir, setOrderDir] = useState("DESC");

    const {isAuthenticated} = useAuth();

    const fetchPostsData = async () => {
        try {
            setLoading(true);
            const postsData = await getPosts(
                page,
                limit,
                orderBy,
                orderDir,
                categories.map((category) => category.id)
            );
            console.log(postsData);
            setPosts(postsData.data);
            setPagination(postsData.pagination)
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setOrderBy(order);
    }, [order, location.pathname]);

    useEffect(() => {
        fetchPostsData();
    }, [categories, page, limit, orderBy, orderDir]);

    if (loading) {
        return <PagePlaceholder type="loading" message="Loading posts..." />;
    }

    if (!posts) {
        return (
            <PagePlaceholder
                type="not-found"
                message="No posts found or an error occurred"
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
            <div>
                {posts?.length > 0 ? (
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
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <h2 className={styles.emptyTitle}>No posts with this filter yet!</h2>
                            <h3 className={styles.emptySubtitle}>
                                Want to <Link to={isAuthenticated ? "?modal=write" : "?modal=auth/login"} className={styles.createLink}>create</Link> one?
                            </h3>
                        </div>
                    )
                }

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
