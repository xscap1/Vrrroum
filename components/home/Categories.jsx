import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import CategoryCard from "../common/cards/categories/CategoryCard";
import commonStyles from "../../styles/common";
import {COLORS, SIZES, icons } from "../../constants";

const Categories = () => {
    const router = useRouter();

    const categories = [
        {
            id : 1,
            icon : icons.rim,
            name : 'Nettoyant jantes'
        },
        {
            id : 2,
            icon : icons.shampoo,
            name : 'Shampooing'
        },
        {
            id : 3,
            icon : icons.interior,
            name : 'Nettoyant intérieur'
        },
        {
            id : 4,
            icon : icons.car,
            name : 'Nettoyant extérieur'
        },        {
            id : 5,
            icon : icons.wax,
            name : 'Cire carrosserie'
        },        {
            id : 6,
            icon : icons.motoroil_selected,
            name : 'Huile moteur'
        },
    ];

    categoriesArr = categories.map(cat => (
        <CategoryCard key={cat.id} icon={cat.icon} name={cat.name}></CategoryCard>
    ));

    return(
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Catégories</Text>
            <View style={{marginTop: 15}}>
                {categoriesArr}
            </View>
        </View>
    );
}

export default Categories;