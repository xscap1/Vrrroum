import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import CategoryCard from "../common/cards/categories/CategoryCard";
import commonStyles from "../../styles/common";
import { COLORS, SIZES, icons } from "../../constants";

const Categories = () => {
    const router = useRouter();

    const categories = [
        {
            id: 1,
            icon: icons.rim,
            name: 'Nettoyant jantes',
            cat: 'rim_cleaner'
        },
        {
            id: 2,
            icon: icons.shampoo,
            name: 'Shampooing',
            cat: 'shampoo'
        },
        {
            id: 3,
            icon: icons.interior,
            name: 'Nettoyant intérieur',
            cat: 'interior_plastic_cleaner'
        },
        {
            id: 4,
            icon: icons.car,
            name: 'Nettoyant extérieur',
            cat: 'car_cleaner'
        }, {
            id: 5,
            icon: icons.wax,
            name: 'Cire carrosserie',
            cat: 'wax'
        }, {
            id: 6,
            icon: icons.motoroil_selected,
            name: 'Huile moteur',
            cat: 'engine_oil'
        },
    ];

    categoriesArr = categories.map(cat => (
        <CategoryCard key={cat.id} category={cat}></CategoryCard>
    ));

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Catégories</Text>
            <View style={{ marginTop: 15 }}>
                {categoriesArr}
            </View>
        </View>
    );
}

export default Categories;