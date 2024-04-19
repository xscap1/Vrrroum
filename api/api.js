import { deleteHistory, storeHistoryInCache } from "../utils";

const serverip = 'http://192.168.0.145:8383/api';
//Vincent
// const serverip = 'http://192.168.1.23:8383/api';
//Sahra
// const serverip = 'http://192.168.1.145:8383/api';

const getBestRatedPreviewFromApi = async (setData, setLoading) => {
    try {
        await fetch(serverip + '/bestRatedPreview')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    } catch (error) {
        console.error(error);
    }
};

const getBestRatedFromApi = async (setData, setLoading) => {
    try {
        await fetch(serverip + '/bestRated')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    } catch (error) {
        console.error(error);
    }
};

const getTrendsPreviewFromApi = async (setData, setLoading) => {
    try {
        await fetch(serverip + '/trendsPreview')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    } catch (error) {
        console.error(error);
    }
};

const getTrendsFromApi = async (setData, setLoading) => {
    try {
        await fetch(serverip + '/trends')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    } catch (error) {
        console.error(error);
    }
};

const geCategoryBatchFromApi = async (category, cursor, setData, setLoading, setCursor) => {
    try {
        let q = serverip + '/categoriesBatch/' + category;
        if (cursor != null) {
            q = serverip + '/categoriesBatch/' + category + '?cursor=' + cursor;
        }

        await fetch(q)
            .then((response) => response.json())
            .then((json) => {
                if (cursor == null) {
                    setData(json.data);
                }
                else {
                    setData(prevData => [...prevData, ...json.data]);
                }
                setCursor(json.nextCursor);
            })
            .catch((error) => console.error(error))
            .finally(() => { setLoading(false); });
    } catch (error) {
        console.error(error);
    }
};

const getRecommendationsFromApi = async (id, category, score, setData, setLoading) => {
    let q = serverip + '/recommendations/' + id + '?category=' + category + '&score=' + score;

    try {
        await fetch(q)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => { setLoading(false); });
    } catch (error) {
        console.error(error);
    }
}

const getProductFromApi = async (id, setData, setLoading) => {
    let q = serverip + "/products/" + id;
    try {
        await fetch(q)
            .then((response) => response.json())
            .then((json) => {
                if (!json.hasOwnProperty("message")) {
                    setData(json);
                    // deleteHistory();
                    storeHistoryInCache(json.id);
                }

            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    } catch (error) {
        console.error(error);
    }
}


const PostUserLoginFromApi = async (data) => {
    try {
        const res = await fetch(serverip + '/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        });
        //     .then(response => response.json())
        //     .then((json) => {
        //         // console.log(json.data);
        //         return json;
        //     });

        // console.log(res.status.json);
        return res.json();
    }

    catch (e) {
        console.error(e);
    }
}

const PostIdsFromApi = async (data, setData, setLoading) => {
    try {
        await fetch(serverip + '/products/list', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => { setLoading(false); });
    }

    catch (e) {
        console.error(e);
    }
}

const PostSearchKeywordsToApi = async (data, setData, setLoading) => {
    try {
        await fetch(serverip + '/products/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => { setLoading(false); });
    }

    catch (e) {
        console.error(e);
    }
}

const PostReportBugToApi = async (data, setData) => {
    console.log(data);
    try {
        await fetch(serverip + '/report', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => console.error(error))
    }

    catch (e) {
        console.error(e);
    }
}

const PostReportMissingProductToApi = async (data, setData) => {
    console.log(data);
    try {
        await fetch(serverip + '/report/product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => console.error(error))
    }

    catch (e) {
        console.error(e);
    }
}

export { getBestRatedFromApi, getBestRatedPreviewFromApi, getTrendsFromApi, getTrendsPreviewFromApi, geCategoryBatchFromApi, getRecommendationsFromApi, getProductFromApi, PostUserLoginFromApi, PostIdsFromApi, PostSearchKeywordsToApi, PostReportBugToApi, PostReportMissingProductToApi }