import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import ListedProducts from "../../../components/home/ListedProducts";
import { deleteHistory, getHistoryInCache, storeHistoryInCache } from "../../../utils";

const History = () => {

  const api = require('../../../api/api');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const getHistory = async () => {
      // await deleteHistory();
      const h = await getHistoryInCache();
      if (h != null && h.length > 0)
        api.PostIdsFromApi(JSON.stringify(h), setData, setLoading);

    }

    getHistory();
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
          <Text style={commonStyles.heading}>Historique</Text>
          {isLoading ? <ActivityIndicator /> : (
            <ListedProducts products={data} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default History;