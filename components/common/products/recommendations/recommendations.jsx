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

    const parents= {
        "body": "body",
        "shampoo": "body",
        "wax": "body",
        "polish": "body",
        "scratches": "body",
        "chrome": "body",
        "dirt": "body",
        "rim": "wheel",
        "tire": "wheel",
        "window": "window",
        "rain": "window",
        "fog": "window",
        "textile": "textile",
        "leather": "leather",
    }

    const isSubCategory = (category) => {
        if (parents[category])
            return true;
        return false;
    }

    const getCategoryParent = (category) => {
        if (parents[category]) {
            return parents[category];
        }

        return parents["invalid"];
    }

    useEffect(() => {
        if (product.score >= 0) {

            var category = product.category;
            var parent = "";

            if (isSubCategory(category)) {
                parent = getCategoryParent(category);
            }

            else {
                parent = category;
                category = "products";
            }
            
            api.getRecommendationsFromApi(product.id, category, parent, product.score, setRecommendations, setLoading);
        }
    }, []);

    return (
        <View>
            <Text style={commonStyles.heading}>Recommandations</Text>
            <ProtectedRoute>
                <View style={{marginBottom: 20}}>
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