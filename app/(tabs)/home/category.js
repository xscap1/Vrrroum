import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import React, { useEffect, useState } from 'react';
import NoAccess from "../../../components/common/noaccess/NoAccess";
import { isSubscriptionActiveFromRCProvider } from "../../../utils/rcprovider";

const Category = () => {
    const router = useRouter();

    const api = require('../../../api/api');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [cursor, setCursor] = useState(null);
    const [isMember, setIsMember] = useState();

    const local = useLocalSearchParams();

    const category = local.category;

    useEffect(() => {
        const getSubscriptionInfo = async () => {
            const active = await isSubscriptionActiveFromRCProvider();
            setIsMember(active);
        }

        getSubscriptionInfo();
    }, []);

    useEffect(() => {
        api.geCategoryBatchFromApi(category, null, setData, setLoading, setCursor);
        console.log(cursor);
    }, []);


    const fetchData = () => {
        try {
            api.geCategoryBatchFromApi(category, cursor, setData, setLoading, setCursor);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };


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
                        <Text style={commonStyles.heading}>{category}</Text>

                        {isLoading ? <ActivityIndicator /> : (
                            <ListedProducts products={data} onEndOnPress={fetchData} />
                        )}
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
};

export default Category;