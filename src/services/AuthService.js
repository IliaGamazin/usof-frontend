export const signup = async (data) => {
    console.log(data);
    const URL = 'http://localhost:8080/api/auth/register';
    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Signup failed');
    }

    return await response.json();
}

export const login = async (data) => {
    console.log(data);
    const URL = 'http://localhost:8080/api/auth/login';
    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const res = await response.json();
        console.log(res.error);
        throw new Error(res.error.message || 'Login failed');
    }

    return await response.json();
}

export const logout = async (data) => {

}

export const refresh = async () => {
    const response = await fetch('http://localhost:8080/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Token refresh failed');
    }

    const data = await response.json();
    return data.access_token;
}
