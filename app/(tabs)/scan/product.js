import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import commonStyles from "../../../styles/common";
import React from 'react';
import { useState, useEffect } from "react";
import ProductCard from "../../../components/common/cards/Product/productCard";
import ProductNotFoundCard from "../../../components/common/cards/Product/productNotFoundCard";

const Product = () => {

    const { code } = useLocalSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const api = require('../../../api/api');
    const utils = require('../../../constants/utils');

    useEffect(() => {
        api.getProductFromApi(code.data, setData, setLoading);
    }, []);

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
                {isLoading ? <ActivityIndicator /> : (data ? <ProductCard product={data} colorNote={utils.noteToColor(data.score)} /> : <ProductNotFoundCard/>)}
            </SafeAreaView>
        </View>
    );
};

export default Product;