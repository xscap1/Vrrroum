import { SafeAreaView, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, {useState, useEffect} from 'react';
import commonStyles from "../../../styles/common";
import ProductCard from "../../../components/common/cards/Product/productCard";
import { getProductInCache } from "../../../utils";

const Product = () => {

    // const { product } = getProductInCache();
    const [product, setProduct] = useState();
    const utils = require('../../../constants/utils');

    useEffect(() => {
        const getProduct = async () => {
            const p = await getProductInCache();
            setProduct(p);
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
                {product ? <ProductCard product={product} colorNote={utils.noteToColor(product.score)} /> : null}
            </SafeAreaView>
        </View>
    );
};

export default Product;