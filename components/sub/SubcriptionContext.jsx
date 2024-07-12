import React, { createContext, useState, useEffect, useContext } from 'react';
import { configureRCProvider, logInCustomerToRCProvider, logOutCustomerFromRCProvider } from "../../utils/rcprovider";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const [subscription, setSubscription] = useState(null);
    const [rcCustomerInfo, setRcCustomerInfo] = useState(null);
    const [managementUrl, setManagementUrl] = useState(null);

    useEffect(() => {
        const configureRevenueCat = async () => {
            try {
                await configureRCProvider();
            }
            catch (error) {
                console.log(error);
            }
        }

        configureRevenueCat();
    }, []);

    const fetchSubscription = async (user) => {
        try {
            if (user) {
                console.log('[SubcriptionProvider] Can access user\'s data.');
                const customerInfo = await logInCustomerToRCProvider(user.uid, user.email);
                console.log(JSON.stringify(customerInfo, null, 2));
                if (customerInfo) {
                    setRcCustomerInfo(customerInfo);
                    setManagementUrl(customerInfo.managementURL);
                    const isActive = isSubscriptionActive(customerInfo);
                    console.log(isActive);
                    if (isActive) {
                        const keys = Object.keys(customerInfo.entitlements.active);
                        if (keys.length > 0) {
                            const sub = customerInfo.entitlements.active[keys[0]];
                            if (sub) {
                                setSubscription(sub);
                            }
                        }
                    }
                }
            }

            else {
                disableSubscription();
                console.log('[SubcriptionProvider] User not logged in. Can\'t access.')
            }
        }
        catch (error) {
            console.log(error);
            console.log('[SubcriptionProvider] Unable to fetch RevenueCat API.');
        }
    }

    const updateSubcription = async (user) => {

    }

    const disableSubscription = () => {
        setSubscription(null);
    }

    const handleSubscriptionLogOut = async () => {
        setSubscription(null);
        const customerInfo = await logOutCustomerFromRCProvider();
        console.log(JSON.stringify(customerInfo, null, 2));
    }

    const isSubscriptionActive = (customerInfo) => {
        if (customerInfo)
            return customerInfo.activeSubscriptions.length > 0
    }

    const getSubscriptionType = () => {
        if (subscription)
            return Object.keys(customerInfo.entitlements.active)[0];
    }

    return (
        <SubscriptionContext.Provider value={{ subscription, fetchSubscription, handleSubscriptionLogOut, managementUrl }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

export default SubscriptionContext;