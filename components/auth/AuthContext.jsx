import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import SubscriptionContext from '../sub/SubscriptionContext';
import ProtectedApiRoutes from '../../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { fetchSubscription, handleSubscriptionLogOut } = useContext(SubscriptionContext);
    const { PostDeleteUserToApi } = ProtectedApiRoutes();

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

    const deleteUser = async () => {
        if (user) {
            const res = await PostDeleteUserToApi(JSON.stringify({ uid: user.uid }));
            if (res.status) {
                const auth = getAuth();
                await auth.currentUser.delete().then(() => {
                    handleLogOut();
                    return true;
                }).catch((error) => {
                    console.error(error);
                    return false;
                })
                return true;
            }
        }
        return false;
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
        <AuthContext.Provider value={{ user, loading, handleLogOut, updateUser, deleteUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
