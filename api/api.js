const getBestRatedPreviewFromApi = async (setData, setLoading) => {
    try {
        await fetch('http://192.168.0.145:8383/api/bestRatedPreview')
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
        await fetch('http://192.168.0.145:8383/api/bestRated')
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
        await fetch('http://192.168.0.145:8383/api/trendsPreview')
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
        await fetch('http://192.168.0.145:8383/api/trends')
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
        let q = 'http://192.168.0.145:8383/api/categoriesBatch/' + category;
        if (cursor != null) {
            q = 'http://192.168.0.145:8383/api/categoriesBatch/' + category + '?cursor=' + cursor;
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
    let q = 'http://192.168.0.145:8383/api/recommendations/'+id+'?category=' + category + '&score=' + score;

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


export { getBestRatedFromApi, getBestRatedPreviewFromApi, getTrendsFromApi, getTrendsPreviewFromApi, geCategoryBatchFromApi, getRecommendationsFromApi }