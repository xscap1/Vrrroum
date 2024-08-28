import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, FlatList } from "react-native";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import CategoryCard from "../../../components/common/cards/categories/CategoryCard";
import { icons } from "../../../constants";

const subCategory = () => {

    const local = useLocalSearchParams();
    const category = local.category;
    const name = local.name;
    const subcategory = local.subcategory

    const sub = subcategory.split(',');
    categories = [];

    const getName = (category) => {
        switch (category) {
            case 'body':
                return 'Carrosserie';
            case 'chrome':
                return 'Chrome et Alu';
            case 'dirt':
                return 'Détachant goudron';
            case 'polish':
                return 'Polish et lustreur';
            case 'scratches':
                return 'Efface rayures';
            case 'shampoo':
                return 'Shampoing';
            case 'wax':
                return 'Cire';
            case 'rim':
                return 'Jantes';
            case 'tire':
                return 'Pneus';
            case 'window':
                return 'Vitre';
            case 'rain':
                return 'Anti pluie';
            case 'fog':
                return 'Anti buée';
            case 'textile':
                return 'Tissu';
            case 'leather':
                return 'Cuir';
            case 'brake':
                return 'Frein';
            case 'bugs':
                return 'Nettoyant insecte';
            default:
                return '';
        }
    }

    const getIcon = (category) => {
        switch (category) {
            case 'body':
                return icons.body;
            case 'chrome':
                return icons.shine;
            case 'dirt':
                return icons.dirt;
            case 'polish':
                return icons.polish;
            case 'scratches':
                return icons.erase;
            case 'shampoo':
                return icons.shampoo;
            case 'wax':
                return icons.wax;
            case 'rim':
                return icons.rim;
            case 'tire':
                return icons.tire;
            case 'window':
                return icons.window;
            case 'rain':
                return icons.rain;
            case 'fog':
                return icons.fog;
            case 'textile':
                return icons.textile;
            case 'leather':
                return icons.leather;
            case 'brake':
                return icons.brake;
            case 'bugs':
                return icons.insect;
            default:
                return icons.car;
        }
    }

    for (i = 0; i < sub.length; i++) {
        const cat = {
            id: i,
            name: getName(sub[i]),
            icon: getIcon(sub[i]),
            cat: sub[i],
            parent: category,
            subcat: []
        }
        categories[i] = cat;
    }

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
                <View style={commonStyles.flexContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={commonStyles.heading}>{name}</Text>
                        <View style={{ marginTop: 15 }}>
                            {sub.length > 5 ?
                                < FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{ marginBottom: 30 }}
                                    data={categories}
                                    renderItem={({ item }) => (
                                        <CategoryCard key={item.id} category={item}></CategoryCard>
                                    )}
                                />
                                :
                                categories.map(function (item, i) {
                                    return <CategoryCard
                                        key={i}
                                        category={item}
                                    />
                                })
                            }
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );

};

export default subCategory;