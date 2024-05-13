import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import React, { useEffect, useState } from 'react';
import NoAccess from "../../../components/common/noaccess/NoAccess";
import { isSubscriptionActiveFromRCProvider } from "../../../utils/rcprovider";

const BestRated = () => {
  const router = useRouter();

  const api = require('../../../api/api');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [isMember, setIsMember] = useState();

  useEffect(() => {
    const getSubscriptionInfo = async ()=> {
      const active = await isSubscriptionActiveFromRCProvider();
      setIsMember(active);
    }

    getSubscriptionInfo();
  }, []);

  useEffect(() => {
    api.getBestRatedFromApi(setData, setLoading);
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

          {!isMember ? <NoAccess /> :
            <View style={{flex: 1}}>
              <Text style={commonStyles.heading}>Les mieux notés</Text>
              <Text style={commonStyles.subtext}>Voici notre sélection des meilleurs produits de cette semaine</Text>

              {isLoading ? <ActivityIndicator /> : (
                <ListedProducts products={data} />
              )}
            </View>}
        </View>

      </SafeAreaView >
    </View >
  );
};

export default BestRated;