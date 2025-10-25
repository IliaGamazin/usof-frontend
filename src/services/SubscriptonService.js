export const followPost = async (authFetch, id) => {
    const URL = `http://localhost:8080/api/posts/subscriptions/${id}`;
    const response = await authFetch(URL, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Follow post failed');
    }

    return  {success: true};
}

export const unFollowPost = async (authFetch, id) => {
    const URL = `http://localhost:8080/api/posts/subscriptions/${id}`;
    const response = await authFetch(URL, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Unfollow post failed');
    }

    return  {success: true};
}

export const favouritePost = async (authFetch, id) => {
    const URL = `http://localhost:8080/api/posts/favourite/${id}`;
    const response = await authFetch(URL, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Add to favourites failed');
    }

    return  {success: true};
}

export const unFavouritePost = async (authFetch, id) => {
    const URL = `http://localhost:8080/api/posts/favourite/${id}`;
    const response = await authFetch(URL, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Remove from favourites failed');
    }

    return  {success: true};
}
