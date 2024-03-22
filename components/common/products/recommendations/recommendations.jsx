import { React, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import commonStyles from "../../../../styles/common";
import ListedProducts from "../../../home/ListedProducts";

const Recommendations = ({ product }) => {

    const [isLoading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState();

    console.log("looking for recommendations of");

    const api = require('../../../../api/api');

    useEffect(() => {
        console.log("Je passe ici");
        if (product.score >= 0)
         api.getRecommendationsFromApi(product.id, product.category, product.score, setRecommendations, setLoading);
    }, []);

    return (
        <View>
            <Text style={commonStyles.heading}>Recommendations</Text>
            {isLoading ? <ActivityIndicator /> : <ListedProducts products={recommendations} flatlist={false} />}
        </View>
    );
};

export default Recommendations;