export const getCategories = async (page, limit, order_by, order_dir, title = null) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (order_by) params.append('order_by', order_by);
    if (order_dir) params.append('order_dir', order_dir);
    if (title) params.append('title', title);

    const queryString = params.toString();
    const URL = `http://localhost:8080/api/categories${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get categories');
    }

    return await response.json();
}

export const getCategory = async (id) => {
    const URL = `http://localhost:8080/api/categories/${id}`;
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get category');
    }

    return await response.json();
}
