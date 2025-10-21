import { refresh } from './AuthService';

let isRefreshing = false;
let refreshPromise = null;

export const fetchWithAuth = async (url, options = {}, token, setToken) => {
    const makeRequest = async (accessToken) => {
        return fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
            },
        });
    };

    let response = await makeRequest(token);

    if (response.status === 401) {
        try {
            if (isRefreshing) {
                const newToken = await refreshPromise;
                return await makeRequest(newToken);
            }

            isRefreshing = true;
            refreshPromise = refresh();

            const newToken = await refreshPromise;
            setToken(newToken);
            response = await makeRequest(newToken);
        }
        catch (error) {
            setToken(null);
            throw new Error('Session expired. Please log in again.');
        }
        finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    }

    return response;
};

import { useAuth } from '../context/AuthContext';

export const useAuthFetch = () => {
    const { accessToken, setAccessToken } = useAuth();

    return async (url, options = {}) => {
        return fetchWithAuth(url, options, accessToken, setAccessToken);
    };
};
