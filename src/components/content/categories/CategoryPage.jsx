import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router";
import styles from "./CategoryPage.module.css";
import Pagination from "../../common/pagination/Pagination.jsx";
import PostPreview from "../../common/previews/post/PostPreview.jsx";

import {getCategory} from "../../../services/CategoryService.js";
import {getCategoriesPosts, getPosts} from "../../../services/PostService.js";
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";

export default function CategoryPage() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [orderBy, setOrderBy] = useState("score");
    const [orderDir, setOrderDir] = useState("DESC");

    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                setLoading(true);
                const categoryData = await getCategory(id);
                setCategory(categoryData);
                const postData = await getCategoriesPosts([id], page, limit, orderBy, orderDir);
                setPosts(postData.data);
                setPagination(postData.pagination);
            }
            catch (err) {
                console.log(err);
                if(!category) {
                    navigate("/*")
                }
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

    }, [id]);

    if (loading) {
        return <PagePlaceholder type="loading" message="Loading category..." />;
    }

    if (!category) {
        return (
            <PagePlaceholder
                type="not-found"
                message="Category not found or an error occurred"
            />
        );
    }

    window.scrollTo(0, 0);

    return (
        <>
            <div className={styles.container}>
                <header className={styles.categoryHeader}>
                    <h1 className={styles.categoryTitle}>{category.title}</h1>
                    {category.description && (
                        <p className={styles.categoryDescription}>{category.description}</p>
                    )}
                </header>
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
                        <h2 className={styles.emptyTitle}>This category has no posts yet!</h2>
                        <h3 className={styles.emptySubtitle}>
                            Want to <Link to="?modal=write" className={styles.createLink}>create</Link> one?
                        </h3>
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
