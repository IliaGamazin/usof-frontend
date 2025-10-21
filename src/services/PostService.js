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