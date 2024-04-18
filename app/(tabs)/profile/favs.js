import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import { deleteFavorites, getFavoritesInCache, removeAllFavorites, removeFavoriteByIdInCache } from '../../../utils';
import ListedProducts from "../../../components/home/ListedProducts";
import Favorites from "../../../components/profile/favs/Favorites";
import DisplayTextInformations from "../../../components/common/cards/DisplayTextInformations";

const Favs = () => {

  const api = require('../../../api/api');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  const missingFavoritesText = "Vous n'avez aucun produit favoris. Scanner ou rechercher un produit pour l'ajouter à vos favoris !"

  useEffect(() => {
    const deleteFavs = async () => {
      await deleteFavorites();
    }

    const getFavorites = async () => {
      const f = await getFavoritesInCache();
      if (f != null && f.length > 0)
        api.PostIdsFromApi(JSON.stringify(f), setData, setLoading);
      else {
        setLoading(false);
      }
      return f;
    }

    // deleteFavs();
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

          {isLoading ? <ActivityIndicator /> : 
          (data ? <Favorites products={data} onEmptyFavorites={() => {setData(undefined);}}/> :
            <DisplayTextInformations text={missingFavoritesText}/>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Favs;