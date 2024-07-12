import Purchases, { PurchasesOffering, LOG_LEVEL } from "react-native-purchases";
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

const APIKeys = {
    apple: "appl_TSXyjYXVGQMQOMWTXPTyyTAvwtc",
    google: "goog_uFlEWDvOKFjmInkMbxoEILwzCyB",
};

const SUBSCRIPTION_EVENT_TYPES = {
    DISABLE: "DISABLE",
    UPGRADE: "UPGRADE",
    DOWNGRANDE: "DOWNGRADE",
    MONTH_TO_ANNUAL: "MONTH_TO_ANNUAL",
    ANNUAL_MONTH: "ANNUAL_MONTH",
}

export const getActiveSubscriptionFromRCProvider = async () => {
    let user = await SecureStore.getItemAsync('user');
    user = JSON.parse(user);

    if (user != null && user != undefined) {
        const customerInfo = await Purchases.getCustomerInfo();
        if (customerInfo.activeSubscriptions.length > 0)
            return customerInfo.activeSubscriptions[0];
    }
}

export const isSubscriptionActiveFromRCProvider = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    if (customerInfo.activeSubscriptions.length > 0)
        return true;
    return false;
}

export const getActiveSubscriptionInfoFromRCProvider = async () => {
    let user = await SecureStore.getItemAsync('user');
    user = JSON.parse(user);
    if (user != null && user != undefined) {
        const customerInfo = await Purchases.getCustomerInfo();
        const managementURL = customerInfo.managementURL;
        console.log(customerInfo.activeSubscriptions);
        if (customerInfo.activeSubscriptions.length > 0) {
            let actives = customerInfo.entitlements.active;
            if (actives != null && actives != undefined) {
                Object.values(actives)[0].managementURL = managementURL;
                return actives;
            }
        }
        return undefined;
    }

    return undefined;
}

export const logInCustomerToRCProvider = async (uid, email) => {
    try {
        if (uid && email) {
            if (typeof uid === 'string' && typeof email === 'string') {
                const { customerInfo } = await Purchases.logIn(uid)
                if (customerInfo)
                    await Purchases.setEmail(email);
                return  customerInfo;
            }
        }
    }

    catch (error) {
        console.log(error);
        return (null);
    }
}

export const logOutCustomerFromRCProvider = async () => {
    const { customerInfo } = await Purchases.logOut();
    return customerInfo;
}

export const configureRCProvider = async () => {
    // Setup api keys
    if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
    } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
    }
}

export const configureRCProviderWithUserId = async (uid) => {
    // Setup api keys
    if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google, appUserID: uid });
    } else {
        await Purchases.configure({ apiKey: APIKeys.apple, appUserID: uid });
    }
}

export const getOfferingsFromRCProvider = async () => {
    const offerings = await Purchases.getOfferings();
    return offerings;
}