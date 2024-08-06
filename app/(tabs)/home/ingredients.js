import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from "react-native";
import commonStyles from "../../../styles/common";
import { Stack, useLocalSearchParams } from "expo-router";
import Ingredient from "../../../components/common/products/notation/ingredient";
import { useNavigation } from "expo-router";

const Ingredients = () => {

    const local = useLocalSearchParams();
    const [ingredientData, setIngredientData] = useState();
    const [loading, setLoading] = useState(true);
    const api = require('../../../api/api');

    useEffect(() => {
        const fetchIngredients = async () => {
            await api.PostIngredientsToApi(JSON.stringify(local.ingredients), setIngredientData, setLoading);
        };

        if (local.ingredients != "undefined")
            fetchIngredients();
    }, []);

    const IngredientList = () => (
        <View style={commonStyles.container}>
            <ScrollView
                style={{ height: '100%' }}>
                {ingredientData
                    ? Object.keys(ingredientData).map((category, index) => (
                        <Ingredient
                            key={index} // Utilisation de l'index comme clé unique (il est préférable d'avoir une clé plus spécifique si possible)
                            category={category}
                            ingredients={ingredientData[category]}
                        />
                    ))
                    : null}
            </ScrollView>
        </View>
    );

    return (
        <View style={commonStyles.body}>
            <SafeAreaView style={commonStyles.flexSafeArea}>
                <Stack.Screen
                    options={{
                        headerStyle: commonStyles.header,
                        headerShadowVisible: false,
                        headerTitle: "",
                    }}
                />
                {loading ? <ActivityIndicator /> :
                    <View>
                        {ingredientData
                            ? <IngredientList />
                            : null}
                    </View>}

            </SafeAreaView>
        </View>
    );
}

export default Ingredients;