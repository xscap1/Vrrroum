import { deleteHistory, storeHistoryInCache } from "../utils";
import { auth } from "../firebaseConfig";

// const serverip = 'https://api.vrrroum.com/api';
//localhost/mac
const serverip = 'http://192.168.0.145:8383/api';
//Vincent
// const serverip = 'http://192.168.1.23:8383/api';
//Sahra
// const serverip = 'http://192.168.1.145:8383/api';

const ProtectedApiRoutes = () => {

    const getIdToken = async () => {
        return await auth.currentUser.getIdToken(true);
    }

    const PostSignUpUserFromApi = async (data) => {
        try {
            const res = await fetch(serverip + '/users/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            });
            return res.json();
        }

        catch (error) {
            console.log(error);
        }
    }

    const getBestRatedFromApi = async (setData, setLoading) => {
        try {
            const token = await getIdToken();
            await fetch(serverip + '/bestRated', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        } catch (error) {
            console.error(error);
        }
    };

    const updateSubscriptionFromApi = async (data) => {
        try {
            const token = await getIdToken();
            const res = await fetch(serverip + '/users/sub', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            });
            return res.json();
        }

        catch (error) {
            console.log(error);
        }
    }

    const PostVerifyEmailToApi = async (data) => {
        try {

            const token = await getIdToken();
            const res = await fetch(serverip + '/users/verify', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            });
            return res.json();
        }
    
        catch (error) {
            console.log(error);
        }
    }

    return { PostSignUpUserFromApi, getBestRatedFromApi, updateSubscriptionFromApi, PostVerifyEmailToApi };
}



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

const getCategoryBatchFromApi = async (category, subcategory, cursor, setData, setLoading, setCursor) => {
    try {
        let q = serverip + '/categoriesBatch/' + category + "/" + subcategory;
        if (cursor != null) {
            q = serverip + '/categoriesBatch/' + category + "/" + subcategory + '?cursor=' + cursor;
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

const getRecommendationsFromApi = async (id, category, parent, score, setData, setLoading) => {
    let q = serverip + '/recommendations/' + id + '?category=' + category + '&parent=' + parent + '&score=' + score;

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
        return res.json();
    }

    catch (e) {
        console.error(e);
    }
}

const PostSignUpUserFromApi = () => {
    try {
        // console.log(ApiAuth.user.uid);
        // console.log(user.uid);
        // const res = await fetch(serverip + '/users/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': '',
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: data
        // });
    }

    catch (error) {
        console.log(error);
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

export { getBestRatedFromApi, getBestRatedPreviewFromApi, getTrendsFromApi, getTrendsPreviewFromApi, getCategoryBatchFromApi, getRecommendationsFromApi, getProductFromApi, PostUserLoginFromApi, PostIdsFromApi, PostSearchKeywordsToApi, PostReportBugToApi, PostReportMissingProductToApi, PostSignUpUserFromApi }
export default ProtectedApiRoutes;