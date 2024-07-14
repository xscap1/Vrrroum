import React, { createContext, useState, useEffect, useContext } from 'react';
import { configureRCProvider, logInCustomerToRCProvider, logOutCustomerFromRCProvider, presentPaywallFromRCProvider, getCustomerInfoFromRCProvider } from "../../utils/rcprovider";
import { PAYWALL_RESULT } from "react-native-purchases-ui";

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
                console.log(user.email);
                console.log('[SubscriptionProvider] Can access user\'s data.');
                const customerInfo = await logInCustomerToRCProvider(user.uid, user.email);
                // console.log(JSON.stringify(customerInfo, null, 2));

                if (customerInfo) {
                    setRcCustomerInfo(customerInfo);
                    const isActive = isSubscriptionActive(customerInfo);
                    console.log(isActive);
                    if (isActive)
                        setupSubscription(customerInfo);
                }
            }

            else {
                disableSubscription();
                console.log('[SubscriptionProvider] User not logged in. Can\'t access.')
            }
        }
        catch (error) {
            console.log(error);
            console.log('[SubscriptionProvider] Unable to fetch RevenueCat API.');
        }
    }

    const setupSubscription = (customerInfo) => {
        setManagementUrl(customerInfo.managementURL);
        console.log(customerInfo.managementURL);
        // console.log(JSON.stringify(customerInfo.entitlements.active, null, 2));
        const keys = Object.keys(customerInfo.entitlements.active);
        if (keys.length > 0) {
            const sub = customerInfo.entitlements.active[keys[0]];
            if (sub) {
                console.log(JSON.stringify(sub, null, 2));
                setSubscription(sub);
            }
        }
    }

    const updateSubscription = async () => {
        const customerInfo = await getCustomerInfoFromRCProvider();
        if (customerInfo) {
            setRcCustomerInfo(customerInfo);
            const isActive = isSubscriptionActive(customerInfo);
            if (isActive)
                setupSubscription(customerInfo);
        }
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

    const presentPaywall = async (user, offer) => {
        const paywallResult = await presentPaywallFromRCProvider(offer);
        if (paywallResult) {
            console.log(JSON.stringify(offer, null, 2));
            switch (paywallResult) {
                case PAYWALL_RESULT.NOT_PRESENTED:
                case PAYWALL_RESULT.ERROR:
                case PAYWALL_RESULT.CANCELLED:
                    return false;
                case PAYWALL_RESULT.PURCHASED:
                    console.log("PURCHASED");
                    updateSubscription();
                    return true;
                default:
                    return false;
                // case PAYWALL_RESULT.RESTORED:
            }
        }
    }

    return (
        <SubscriptionContext.Provider value={{ subscription, fetchSubscription, handleSubscriptionLogOut, managementUrl, presentPaywall, updateSubscription }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

export default SubscriptionContext;