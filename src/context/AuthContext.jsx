import {createContext, useContext, useState, useEffect, useRef} from 'react';
import {refresh} from "../services/AuthService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const initialized = useRef(false);
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        console.log("refreshing on mount");
        refresh()
            .then((token) => setAccessToken(token))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    const value = {
        accessToken,
        setAccessToken,
        isLoading,
        isAuthenticated: !!accessToken,
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};
