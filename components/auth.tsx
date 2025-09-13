
import React, { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import * as api from '../services/databaseService';
import type { AuthContextType, Password } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(() => sessionStorage.getItem('isAdmin') === 'true');
    const [adminName, setAdminName] = useState<string | null>(() => sessionStorage.getItem('adminName'));
    const [passwords, setPasswords] = useState<Password[]>([]);

    useEffect(() => {
        const fetchPasswords = async () => {
            if (isAdmin) {
                const fetchedPasswords = await api.getPasswords();
                setPasswords(fetchedPasswords);
            }
        };
        fetchPasswords();
    }, [isAdmin]);

    const login = async (password: string): Promise<boolean> => {
        const result = await api.login(password);
        if (result.success) {
            sessionStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            if (result.name) {
                sessionStorage.setItem('adminName', result.name);
                setAdminName(result.name);
            } else {
                sessionStorage.removeItem('adminName');
                setAdminName(null);
            }
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('isAdmin');
        sessionStorage.removeItem('adminName');
        setIsAdmin(false);
        setAdminName(null);
        setPasswords([]);
    };

    const addPassword = async (password: string): Promise<boolean> => {
        if (!password) return false;

        const newPassword = await api.addPassword({ password });
        if (newPassword) {
            setPasswords(prev => [...prev, newPassword]);
            return true;
        }
        return false;
    };

    const deletePassword = async (id: number): Promise<boolean> => {
        if (passwords.length <= 1) return false;
        const success = await api.deletePassword(id);
        if (success) setPasswords(prev => prev.filter(a => a.id !== id));
        return success;
    };

    return (
        <AuthContext.Provider
            value={{
                isAdmin,
                adminName,
                passwords,
                login,
                logout,
                addPassword,
                deletePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/**
 * A component that protects routes requiring admin authentication.
 * If the user is not an authenticated admin, it redirects them to the admin login page.
 * It preserves the intended destination in the location state, so the user can be
 * redirected back after a successful login.
 */
export const ProtectedRoute = () => {
    const { isAdmin } = useAuth();
    const location = useLocation();

    if (!isAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};