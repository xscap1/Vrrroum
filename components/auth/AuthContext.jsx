import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
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

    const updateUser = async () => {
        const auth = getAuth();
        await auth.currentUser.reload();
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            fetchSubscription(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, handleLogOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
