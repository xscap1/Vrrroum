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
        f = new Set(JSON.parse(f));

        if (f.size < 5) {

            if (!f.has(id)) {
                f.add(id);
                await SecureStore.setItemAsync('favorites', JSON.stringify([...f]));
                return 0;
            }

            else
                return -1;
        }

        return -2;
    }
    else {
        const favorites = new Set();
        favorites.add(id);
        await SecureStore.setItemAsync('favorites', JSON.stringify([...favorites]));
        return 0;
    }
}

export const removeFavoriteByIdInCache = async (id) => {
    let f = await SecureStore.getItemAsync('favorites');
    if (f) {
        f = new Set(JSON.parse(f));
        if (f.has(id)) {
            f.delete(id);
            await SecureStore.setItemAsync('favorites', JSON.stringify([...f]));
            return 0;
        }
    }

    return -1;
}

export const getFavoritesInCache = async () => {
    const f = await SecureStore.getItemAsync('favorites');
    return JSON.parse(f);
}

export const deleteFavorites = async () => {
    await SecureStore.deleteItemAsync('favorites');
}

export const storeHistoryInCache = async (id) => {
    var h = await SecureStore.getItemAsync('history');
    if (h) {
        let history = JSON.parse(h);
        const present = checkPresentInHistory(id, history);
        if (history.length < 5) {
            if (!present) {
                history.push(id);
                await SecureStore.setItemAsync('history', JSON.stringify(history));
            }
        }
        else {
            history.pop();
            history.unshift(id);
            await SecureStore.setItemAsync('history', JSON.stringify(history));
        }
    }
    else {
        const history = [id];
        await SecureStore.setItemAsync('history', JSON.stringify(history));
    }
}

const checkPresentInHistory = (id, history) => {
    let i;
    for (i = 0; i < history.length; i++) {
        if (history[i] == id)
            return true;
    }
    return true;
}

export const deleteHistory = async () => {
    await SecureStore.deleteItemAsync('history');
}

export const getHistoryInCache = async () => {
    const h = await SecureStore.getItemAsync('history');
    return JSON.parse(h);
}