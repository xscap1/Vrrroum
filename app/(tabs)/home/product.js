import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import ProductCard from "../../../components/common/cards/Product/productCard";
import Details from "../../../components/common/products/details/details";
import { COLORS } from '../../../constants';
import ListedProducts from "../../../components/home/ListedProducts";

const Product = () => {
    const router = useRouter();

    const { product } = useLocalSearchParams();

    const utils = require('../../../constants/utils');

    const [show, setShow] = useState(true);

    const api = require('../../../api/api');

    const [isLoading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState();

    useEffect(() => {
        // api.getRecommendationsFromApi(product.id, product.category, product.score, setRecommendations, setLoading);
        api.getRecommendationsFromApi('70382800598', 'interior_plastic_cleaner', 7.2, setRecommendations, setLoading);
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
                <View style={commonStyles.flexContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                        <ProductCard product={product} colorNote={utils.noteToColor(product.score)} />

                        <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity style={{ alignSelf: 'center', width: '80%' }} disabled={show} onPress={() => setShow(!show)}>
                                    <View style={show ? commonStyles.dataActiveButton : commonStyles.dataInactiveButton}>
                                        <Text style={show ? commonStyles.activeText : commonStyles.inactiveText}>Informations</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity style={{ alignSelf: 'center', width: '80%' }} disabled={!show} onPress={() => setShow(!show)}>
                                    <View style={!show ? commonStyles.dataActiveButton : commonStyles.dataInactiveButton}>
                                        <Text style={!show ? commonStyles.activeText : commonStyles.inactiveText}>Environnement</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {show ?
                            <View>
                                <Details product={product} />
                            </View>
                            : null}

                        {!show ?
                            <View>
                                <Text style={commonStyles.text}>Env</Text>
                            </View>
                            : null}

                        <View style={{ marginTop: 20 }}>
                            <Text style={commonStyles.heading}>Comparateur de prix</Text>
                            <View style={commonStyles.subcontainer}>
                                <Text style={{ color: COLORS.subwhite, alignSelf: 'center', textAlign: 'center' }}>Cette fonctionnalité sera bientôt disponible !
                                    L'équipe Vrrroum travaille dur pour vous offrir la solution d'achat en ligne la plus économique.</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={commonStyles.heading}>Recommendations</Text>
                            {isLoading ? <ActivityIndicator /> : <ListedProducts products={recommendations} flatlist={false} />}
                        </View>
                    </ScrollView>


                </View>

            </SafeAreaView>
        </View>
    );
};

export default Product;