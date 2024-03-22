const serverip = 'http://192.168.0.145:8383/api';
// const serverip = 'http://192.168.1.23:8383/api';

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
    console.log(q);
    console.log(id);
    try {
        await fetch(q)
            .then((response) => response.json())
            .then((json) => {
                if (!json.hasOwnProperty("message"))
                    setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => { setLoading(false); });
    } catch (error) {
        console.error(error);
    }
}


const PostUserLoginFromApi = async (data) => {
    try {
        await fetch(serverip+'/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(response => response.json())
        .then((json) => {
            if (json.hasOwnProperty("logged"))
                return json;
        });
    }

    catch(e) {
        console.error(e); 
    }
}


export { getBestRatedFromApi, getBestRatedPreviewFromApi, getTrendsFromApi, getTrendsPreviewFromApi, geCategoryBatchFromApi, getRecommendationsFromApi, getProductFromApi, PostUserLoginFromApi }