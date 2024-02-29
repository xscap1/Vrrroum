import { SafeAreaView, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React from 'react';
import ProductCard from "../../../components/common/cards/Product/productCard";


const Product = () => {

    const router = useRouter();
    const { product } = useLocalSearchParams();
    const utils = require('../../../constants/utils');

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
                <ProductCard product={product} colorNote={utils.noteToColor(product.score)} />
            </SafeAreaView>
        </View>
    );
};

export default Product;