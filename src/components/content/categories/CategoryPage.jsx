import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";

import styles from "./CategoryPage.module.css";
import Pagination from "../../common/pagination/Pagination.jsx";
import PostPreview from "../../common/previews/post/PostPreview.jsx";

import {getCategory} from "../../../services/CategoryService.js";
import {getCategoriesPosts, getPosts} from "../../../services/PostService.js";

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
                console.log(categoryData);
                setCategory(categoryData);
                const postData = await getCategoriesPosts([id], page, limit, orderBy, orderDir);
                console.log(postData);
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

    if (loading) return <div>Loading user...</div>;
    if (!category) return <div>No user found</div>;

    window.scrollTo(0, 0);

    return (
        <>
            <div className={styles.container}>

            </div>
            <div>
                <h1>All posts</h1>
                {posts?.length > 0 && (
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
