import * as SecureStore from 'expo-secure-store';

export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};

export const storeProductInCache = async (product) => {
    const p = await SecureStore.setItemAsync('product', JSON.stringify(product));
}

export const getProductInCache = async () => {
    const p = await SecureStore.getItemAsync('product');
    return JSON.parse(p);
}