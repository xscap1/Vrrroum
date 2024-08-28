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
            icon: icons.car,
            name: 'Carrosserie',
            cat: 'body',
            subcat: ['body', 'shampoo', 'wax', 'polish', 'scratches', 'chrome', 'dirt', 'bugs'],
            parent: ''
        },
        {
            id: 4,
            icon: icons.wheel,
            name: 'Roues',
            cat: 'wheel',
            subcat: ['rim', 'tire', 'brake'],
            parent: ''
        },
        {
            id: 3,
            icon: icons.seat,
            name: 'Sièges',
            cat: 'seat',
            subcat: ['textile', 'leather'],
            parent: ''
        },
        {
            id: 5,
            icon: icons.window,
            name: 'Vitre',
            cat: 'window',
            subcat: ['window', 'rain', 'fog'],
            parent: ''
        },
        {
            id: 2,
            icon: icons.plastic,
            name: 'Nettoyant plastique',
            cat: 'plastic',
            subcat: [],
            parent: ''
        },
        {
            id: 6,
            icon: icons.universal,
            name: 'Nettoyant universel',
            cat: 'universal',
            subcat: [],
            parent: ''
        }
    ];

    categoriesArr = categories.map(cat => (
        <CategoryCard key={cat.id} category={cat}></CategoryCard>
    ));

    return (
        <View style={commonStyles.container}>
            <View style={{ marginTop: 20 }}>
                <Text style={commonStyles.heading}>Catégories</Text>
                <View style={{ marginTop: 15 }}>
                    {categoriesArr}
                </View>
            </View>

        </View>
    );
}

export default Categories;