export const getPostComments = async (postId, page, limit, orderBy, orderDir, parentId = null) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (orderBy) params.append('order_by', orderBy);
    if (orderDir) params.append('order_dir', orderDir);
    if (parentId) params.append('parent_id', parentId);

    const queryString = params.toString();
    const URL = `http://localhost:8080/api/posts/${postId}/comments${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get comments');
    }

    return await response.json();
}

export const newPostComment = async (authFetch, postId, content, parentId = null) => {
    const URL = `http://localhost:8080/api/posts/${postId}/comments`;

    const body = {
        content: content
    };

    if (parentId) {
        body.parent_id = parentId;
    }

    const response = await authFetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to post comment');
    }

    return await response.json();
}
