import { React, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import commonStyles from "../../../../styles/common";
import ListedProducts from "../../../home/ListedProducts";
import NoAccess from "../../noaccess/NoAccess";
import { isSubscriptionActiveFromRCProvider } from "../../../../utils/rcprovider";

const Recommendations = ({ product }) => {

    const [isLoading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState();
    const [isMember, setIsMember] = useState();

    const api = require('../../../../api/api');

    useEffect(() => {
        const getSubscriptionInfo = async () => {
            const active = await isSubscriptionActiveFromRCProvider();
            setIsMember(active);
        }

        getSubscriptionInfo();
    }, []);

    useEffect(() => {
        if (product.score >= 0)
            api.getRecommendationsFromApi(product.id, product.category, product.score, setRecommendations, setLoading);
    }, []);

    return (
        <View>
            <Text style={commonStyles.heading}>Recommandations</Text>
            <View>
                {isLoading ? <ActivityIndicator /> : <ListedProducts products={recommendations} flatlist={false} />}
            </View>
        </View>
    );
};

export default Recommendations;