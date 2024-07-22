import React, { createContext, useState, useEffect, useContext } from 'react';
import { configureRCProvider, logInCustomerToRCProvider, logOutCustomerFromRCProvider, presentPaywallFromRCProvider, getCustomerInfoFromRCProvider } from "../../utils/rcprovider";
import { PAYWALL_RESULT } from "react-native-purchases-ui";
import ProtectedApiRoutes from '../../api/api';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';
import { useNavigation } from 'expo-router';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const [subscription, setSubscription] = useState(null);
    const [rcCustomerInfo, setRcCustomerInfo] = useState(null);
    const [managementUrl, setManagementUrl] = useState(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState(false);
    const { updateSubscriptionFromApi } = ProtectedApiRoutes();
    const navigation = useNavigation();

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
                console.log('[SubscriptionProvider] Can access user\'s data.');
                const customerInfo = await logInCustomerToRCProvider(user.uid, user.email);

                if (customerInfo) {
                    setRcCustomerInfo(customerInfo);
                    const isActive = isSubscriptionActive(customerInfo);
                    if (isActive) {
                        setupSubscription(customerInfo);
                    }
                }
            }

            else {
                disableSubscription();
                console.log('[SubscriptionProvider] User not logged in. Can\'t access.')
            }
        }
        catch (error) {
            console.log('[SubscriptionProvider] Unable to fetch RevenueCat API.');
        }
    }

    const setupSubscription = (customerInfo) => {
        setManagementUrl(customerInfo.managementURL);
        const keys = Object.keys(customerInfo.entitlements.active);
        if (keys.length > 0) {
            const sub = customerInfo.entitlements.active[keys[0]];
            if (sub) {
                setSubscription(sub);
            }
        }
    }

    const updateSubscription = async () => {
        const customerInfo = await getCustomerInfoFromRCProvider();
        if (customerInfo) {
            setRcCustomerInfo(customerInfo);
            const isActive = isSubscriptionActive(customerInfo);

            // console.log("status : " + subscriptionStatus);
            if (subscriptionStatus != isActive) {
                const user = getAuth().currentUser;
                if (user) {
                    if (!isActive) {
                        disableSubscription();
                        Alert.alert("Abonnement", "Votre abonnement s'est terminé.");
                    }
                    // console.log("je met à jour");
                    // const res = await updateSubscriptionFromApi(JSON.stringify({ uid: user.uid, sub: isActive }));
                    // console.log(res);
                }
            }

            if (isActive) {
                setupSubscription(customerInfo);
            }
            else
                disableSubscription();

            setSubscriptionStatus(isActive);
        }
    }

    const disableSubscription = () => {
        setSubscription(null);
    }

    const handleSubscriptionLogOut = async () => {
        setSubscription(null);
        const customerInfo = await logOutCustomerFromRCProvider();
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
            switch (paywallResult) {
                case PAYWALL_RESULT.NOT_PRESENTED:
                case PAYWALL_RESULT.ERROR:
                case PAYWALL_RESULT.CANCELLED:
                    return false;
                case PAYWALL_RESULT.PURCHASED:
                    updateSubscription();
                    navigation.navigate('purchaseCompleted');
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