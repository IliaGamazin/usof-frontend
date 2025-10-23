import React, {useEffect, useState} from 'react';
import {getPosts} from "../../../services/PostService.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import PostPreview from "../../common/previews/post/PostPreview.jsx";

import styles from "./PostsPage.module.css"
import PagePlaceholder from "../../common/placeholder/PagePlaceholder.jsx";
import DataFilter from "../../common/pagination/DataFilter.jsx";

export default function PostsPage() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [orderBy, setOrderBy] = useState("score");
    const [orderDir, setOrderDir] = useState("DESC");

    const fetchPostsData = async () => {
        try {
            setLoading(true);
            const postsData = await getPosts(
                page, limit, orderBy, orderDir
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
        fetchPostsData();
    }, [page, limit, orderBy, orderDir]);

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
            <DataFilter
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                orderDir={orderDir}
                setOrderDir={setOrderDir}
                setPage={setPage}
                allowedSortParams={allowedSortParams}
            />
            <div>
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
