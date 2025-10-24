export const getPost = async (id) => {
    const URL = `http://localhost:8080/api/posts/${id}`;
    const response = await fetch(URL, {
        method: "GET",
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get post');
    }

    return await response.json();
}


export const getPosts = async (page, limit, order_by, order_dir, categories = null, author_id = null) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (order_by) params.append('order_by', order_by);
    if (order_dir) params.append('order_dir', order_dir);
    if (categories !== null && categories.length > 0 ) params.append('categories', categories);
    if (author_id) params.append('author_id', author_id);
    const queryString = params.toString();
    const URL = `http://localhost:8080/api/posts/${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get user posts');
    }

    return await response.json();
}
