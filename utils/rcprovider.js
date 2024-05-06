import Purchases, { PurchasesOffering, LOG_LEVEL } from "react-native-purchases";
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

const APIKeys = {
    apple: "appl_TSXyjYXVGQMQOMWTXPTyyTAvwtc",
    google: "goog_uFlEWDvOKFjmInkMbxoEILwzCyB",
};

export const getActiveSubscriptionFromRCProvider = async () => {
    let user = await SecureStore.getItemAsync('user');
    user = JSON.parse(user);

    if (user != null && user != undefined) {
        const customerInfo = await Purchases.getCustomerInfo();
        if (customerInfo.activeSubscriptions.length > 0)
            return customerInfo.activeSubscriptions[0];
    }
}

export const isActiveSubscriptionFromRCProvider = async () => {
    let user = await SecureStore.getItemAsync('user');
    user = JSON.parse(user);

    if (user != null && user != undefined) {
        const customerInfo = await Purchases.getCustomerInfo();
        if (customerInfo.activeSubscriptions.length == 0)
            return false;
        return true;
    }
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

export const logInCustomerToRCProvider = async () => {
    let user = await SecureStore.getItemAsync('user');
    user = JSON.parse(user);

    if (user != null && user != undefined) {
        const { customerInfo } = await Purchases.logIn(user.id);
        return customerInfo;
    }
}

export const logOutCustomerFromRCProvider = async () => {
    let user = await SecureStore.getItemAsync('user');
    user = JSON.parse(user);

    if (user != null && user != undefined) {
        const { customerInfo } = await Purchases.logOut();
        return customerInfo;
    }
}

export const configureRCProvider = async () => {
    // Setup api keys
    if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
    } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
    }

    const { customerInfo } = await logInCustomerToRCProvider();
    if (customerInfo != null && customerInfo != undefined)
        return true;
    return false;
}

export const getOfferingsFromRCProvider = async () => {
    const offerings = await Purchases.getOfferings();
    return offerings;
}