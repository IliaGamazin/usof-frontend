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


export const patchPost = async (authFetch, id, formData) => {
    const URL = `http://localhost:8080/api/posts/${id}`;
    const response = await authFetch(URL, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Patching failed');
    }

    return {success: true};
}

export const getPosts = async (page, limit, order_by, order_dir, categories = null, author_id = null, title = null) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (title) params.append('title', title);
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

export const getFavouritePosts = async (authFetch, page, limit, order_by, order_dir, categories = null) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (order_by) params.append('order_by', order_by);
    if (order_dir) params.append('order_dir', order_dir);
    if (categories !== null && categories.length > 0 ) params.append('categories', categories);

    const queryString = params.toString();
    const URL = `http://localhost:8080/api/posts/favourite/${queryString ? `?${queryString}` : ''}`;
    const response = await authFetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get favourite posts');
    }

    return await response.json();
}

export const getFollowedPosts = async (authFetch, page, limit, order_by, order_dir, categories = null) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (order_by) params.append('order_by', order_by);
    if (order_dir) params.append('order_dir', order_dir);
    if (categories !== null && categories.length > 0 ) params.append('categories', categories);

    const queryString = params.toString();
    const URL = `http://localhost:8080/api/posts/subscriptions/${queryString ? `?${queryString}` : ''}`;
    const response = await authFetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get followed posts');
    }

    return await response.json();
}

export const newPost = async (authFetch, formData) => {
    const URL = `http://localhost:8080/api/posts`;
    const response = await authFetch(URL, {
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Posting failed');
    }

    return await response.json();
}

export const getPostInteractions = async (authFetch, id) => {
    const URL = `http://localhost:8080/api/posts/${id}/userdata`;
    const response = await authFetch(URL, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Getting user metadata failed');
    }

    return await response.json();
}

export const removeLike = async (authFetch, id) => {
    const URL = `http://localhost:8080/api/posts/${id}/like`;
    const response = await authFetch(URL, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Like remove failed');
    }

    return {success: true};
}

export const addLike = async (authFetch, id, type) => {
    const URL = `http://localhost:8080/api/posts/${id}/like?type=${type}`;
    const response = await authFetch(URL, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Like add failed');
    }

    return {success: true};
}
