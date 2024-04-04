import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import ListedProducts from "../../../components/home/ListedProducts";
import { deleteHistory, getHistoryInCache, storeHistoryInCache } from "../../../utils";
import DisplayTextInformations from "../../../components/common/cards/DisplayTextInformations";

const History = () => {

  const api = require('../../../api/api');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  const missingHistoryText = "Vous n'avez scanné aucun produits récemment. Utiliser le scanner afin d'obtenir des informations sur un produit. Ensuite retrouver tous vos produits scannés ici !"

  useEffect(() => {
    const getHistory = async () => {
      // await deleteHistory();
      const h = await getHistoryInCache();
      if (h != null && h.length > 0)
        api.PostIdsFromApi(JSON.stringify(h), setData, setLoading);

      else if (h.length == 0)
        setLoading(false);

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
          {isLoading ? <ActivityIndicator /> : (data ? <DisplayTextInformations text={missingHistoryText}/> :
            <ListedProducts products={data} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default History;