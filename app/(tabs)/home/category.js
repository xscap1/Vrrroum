import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import React, { useEffect, useState } from 'react';
import NoAccess from "../../../components/common/noaccess/NoAccess";
import { isSubscriptionActiveFromRCProvider } from "../../../utils/rcprovider";
import ProtectedRoute from "../../../components/sub/ProtectedRoute";

const Category = () => {
    const router = useRouter();

    const api = require('../../../api/api');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [cursor, setCursor] = useState(null);

    const local = useLocalSearchParams();

    const category = local.category;
    const name = local.name;
    const parent = local.parent

    useEffect(() => {
        const cat = parent != "" ? parent : category;
        const subcat = parent != "" ? category : 'products';
        api.getCategoryBatchFromApi(cat, subcat, null, setData, setLoading, setCursor);
    }, []);

    const fetchData = () => {
        try {
            const cat = parent != "" ? parent : category;
            const subcat = parent != "" ? category : 'products';

            api.getCategoryBatchFromApi(cat, subcat, cursor, setData, setLoading, setCursor);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    return (
        <ProtectedRoute>
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

                            {isLoading ? <ActivityIndicator /> : (
                                <ListedProducts products={data} onEndOnPress={fetchData} />
                            )}
                        </View>
                    </View>

                </SafeAreaView>
            </View>
        </ProtectedRoute>
    );
};

export default Category;