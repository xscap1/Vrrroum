import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import React, { useEffect, useState } from 'react';

const Trends = () => {
  const router = useRouter();

  const api = require('../../../api/api');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    api.getTrendsFromApi(setData, setLoading);
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
          <Text style={commonStyles.heading}>Les plus tendances</Text>
          <Text style={commonStyles.subtext}>Voici notre sélection des produits les plus scannés de cette semaine</Text>

          {isLoading ? <ActivityIndicator /> : (
            <ListedProducts products={data} />
          )}
        </View>

      </SafeAreaView>
    </View>
  );
};

export default Trends;