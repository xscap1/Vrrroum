import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from "react-native";
import commonStyles from "../../../styles/common";
import { Stack, useLocalSearchParams } from "expo-router";
import NotationDetails from "../../../components/common/products/notation/notationDetails";
import { useRoute } from '@react-navigation/native';

const Notation = () => {
    const route = useRoute();
    const { criteria } = route.params || {};
    const { effectiveness } = route.params || {};
    const { durability } = route.params || {};

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
                <View style={commonStyles.container}>
                    <Text style={commonStyles.heading}>Détails de la notation</Text>
                    <Text style={commonStyles.subtext}>Voici les critères de notation pour ce produit.</Text>
                    {criteria ? <NotationDetails criteria={criteria} effectiveness={effectiveness} durability={durability}/> : null}
                </View>
            </SafeAreaView>
        </View>
    );
}
export default Notation;