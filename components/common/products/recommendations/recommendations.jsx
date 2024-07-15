import { React, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import commonStyles from "../../../../styles/common";
import ListedProducts from "../../../home/ListedProducts";
import DisplayTextInformations from "../../cards/DisplayTextInformations";
import ProtectedRoute from "../../../sub/ProtectedRoute";

const Recommendations = ({ product }) => {

    const [isLoading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const api = require('../../../../api/api');

    useEffect(() => {
        if (product.score >= 0)
            api.getRecommendationsFromApi(product.id, product.category, product.score, setRecommendations, setLoading);
    }, []);

    return (
        <View>
            <Text style={commonStyles.heading}>Recommandations</Text>
            <ProtectedRoute>
                <View>
                    {/* {isLoading ? <ActivityIndicator /> : <ListedProducts products={recommendations} flatlist={false} />} */}
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        recommendations.length > 0 ? (
                            <ListedProducts products={recommendations} flatlist={false} />
                        ) : (
                            <DisplayTextInformations text={"Aucune recommandations trouvées pour l'instant. L'équipe Vrrroum travaille pour vous recommander des produits similaires."} />
                        )
                    )}
                </View>
            </ProtectedRoute>
        </View>
    );
};

export default Recommendations;