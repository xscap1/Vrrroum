import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SubscriptionContext from '../sub/SubscriptionContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { fetchSubscription, handleSubscriptionLogOut } = useContext(SubscriptionContext);

    const handleLogOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            fetchSubscription(null);
            handleSubscriptionLogOut();
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
            fetchSubscription(user);
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
