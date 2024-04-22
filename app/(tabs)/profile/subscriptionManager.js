import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import DisplayTextInformations from "../../../components/common/cards/DisplayTextInformations";
import { getActiveSubscriptionInfoFromRCProvider } from "../../../utils/rcprovider";
import SManager from "../../../components/profile/subscriptionManager/SManager";

const SubscriptionManager = () => {

  const api = require('../../../api/api');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const missingSubscriptionText = "Vous n'êtes pas abonné aux services Vrrroum."

  useEffect(() => {
    const getSubscriptionInfo = async ()=> {
      const info = await getActiveSubscriptionInfoFromRCProvider();
      setData(info);
    }

    getSubscriptionInfo();
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
          <Text style={commonStyles.heading}>Gérer mon abonnement</Text>
          {data != undefined && data != {} && data != null ? <SManager offer={data} /> : <DisplayTextInformations text={missingSubscriptionText} />}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SubscriptionManager;