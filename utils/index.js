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


export const storeFavoritesInCache = async (id) => {
    var f = await SecureStore.getItemAsync('favorites');
    if (f) {
        f.push(id);
        await SecureStore.setItemAsync('favorites', f);
    }
    else {
        const favorites = [id];
        await SecureStore.setItemAsync('favorites', favorites);
    }
}

export const getFavoritesInCache = async () => {
    const f = await SecureStore.getItemAsync('favorites');
    return f;
}


export const storeHistoryInCache = async (id) => {
    var h = await SecureStore.getItemAsync('history');
    if (h) {
        h.push(id);
        await SecureStore.setItemAsync('history', h);
    }
    else {
        const history = [id];
        await SecureStore.setItemAsync('history', history);
    }
}

export const getHistoryInCache = async () => {
    const h = await SecureStore.getItemAsync('history');
    return h;
}