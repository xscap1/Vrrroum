import { SafeAreaView, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import commonStyles from "../../../styles/common";
import ProductCard from "../../../components/common/cards/Product/productCard";
import { getProductInCache } from "../../../utils";

const Product = () => {

    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const utils = require('../../../constants/utils');
    const api = require('../../../api/api');

    useEffect(() => {
        const getProduct = async () => {
            const id = await getProductInCache();
            await api.getProductWithIdFromApi(id, setProduct, setLoading)
        };

        getProduct();
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
                {product ? <ProductCard product={product} /> : null}
            </SafeAreaView>
        </View>
    );
};

export default Product;