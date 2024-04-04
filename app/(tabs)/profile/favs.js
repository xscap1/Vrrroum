import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import { deleteFavorites, getFavoritesInCache } from '../../../utils';
import ListedProducts from "../../../components/home/ListedProducts";
import Favorites from "../../../components/profile/favs/Favorites";

const Favs = () => {

  const api = require('../../../api/api');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const getFavorites = async () => {
      const f = await getFavoritesInCache();
      if (f != null && f.length > 0)
        api.PostIdsFromApi(JSON.stringify(f), setData, setLoading);
      // await deleteFavorites();
    }

    getFavorites();
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
          <Text style={commonStyles.heading}>Favoris</Text>

          {isLoading ? <ActivityIndicator /> : (
            <Favorites products={data} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Favs;