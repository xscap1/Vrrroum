import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState, useContext } from 'react';
import DisplayTextInformations from "../../../components/common/cards/DisplayTextInformations";
import SubscriptionContext from "../../../components/sub/SubcriptionContext";
import SManager from "../../../components/profile/subscriptionManager/SManager";

const SubscriptionManager = () => {

  const { subscription } = useContext(SubscriptionContext);

  return (
    <View style={commonStyles.body}>

      {subscription ?
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
            <SManager />
          </View>
        </SafeAreaView>
        :
        null
      }

    </View>
  );
};

export default SubscriptionManager;