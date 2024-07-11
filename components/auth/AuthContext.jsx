import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogOut = () => {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    useEffect(() => {
        console.log("[AuthProvider] Started.")
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user)
                console.log('[AuthProvider] State changed:', user.uid);
            else
                console.log('[AuthProvider] State changed: Logged out');
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, handleLogOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
