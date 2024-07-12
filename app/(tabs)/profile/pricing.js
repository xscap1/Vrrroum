import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import Pricings from "../../../components/profile/pricing/Pricings";

const Pricing = () => {

    useEffect(() => {
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
                <View style={{
                    paddingTop: 0.05 * ww,
                    paddingLeft: 0.05 * ww,
                    paddingRight: 0.05 * ww,
                    marginBottom: 20
                }}>
                    <Text style={commonStyles.heading}>Abonnements</Text>
                </View>
                <View style={commonStyles.flexContainerWoPadding}>
                    <Pricings />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Pricing;