import {createContext, useContext, useState, useEffect, useRef} from 'react';
import {refresh} from "../services/AuthService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const initialized = useRef(false);
    useEffect(() => {
        const initAuth = async () => {
            if (initialized.current) return;
            initialized.current = true;
            try {
                const token = await refresh();
                setAccessToken(token);
            }
            catch (error) {
                console.error('Failed to refresh token on mount:', error);
            }
        };

        initAuth().finally(() => setIsLoading(false));
    }, []);

    const value = {
        accessToken,
        setAccessToken,
        isLoading,
        isAuthenticated: !!accessToken,
    };

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
