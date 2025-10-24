export const getUser = async (id) => {
    const URL = `http://localhost:8080/api/users/${id}`;
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get user');
    }

    return await response.json();
}

export const getUsers = async (page, limit, order_by, order_dir, login) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (order_by) params.append('order_by', order_by);
    if (order_dir) params.append('order_dir', order_dir);
    if (login) params.append('login', login);

    const queryString = params.toString();
    const URL = `http://localhost:8080/api/users${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Failed to get users');
    }

    return await response.json();
}

export const getMe = async (authFetch) => {
    const URL = `http://localhost:8080/api/users/me`;

    const response = await authFetch(URL, { method: 'GET' });

    if (!response.ok) {
        const res = await response.json();
        throw new Error(res.error?.message || 'Failed to get me');
    }

    return await response.json();
}

export const patchUser = async (authFetch, id, editForm) => {
    const URL = `http://localhost:8080/api/users/${id}`;
    const response = await authFetch(URL, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'User patch failed');
    }

    return await response.json();
}

export const setAvatar = async(authFetch, avatar) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    const URL = `http://localhost:8080/api/users/avatar`;
    const response = await authFetch(URL, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
    });
    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Set avatar failed');
    }

    return {success: true};
}
