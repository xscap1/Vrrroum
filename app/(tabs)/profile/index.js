import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Platform, ActivityIndicator, Alert, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import commonStyles from '../../../styles/common';
import ProfileData from '../../../components/profile/ProfileData';

const Profile = () => {

  return (
    <View style={commonStyles.body}>
      <SafeAreaView style={commonStyles.flexSafeArea}>
        <Stack.Screen
          options={{
            animation: 'none',
            headerStyle: commonStyles.header,
            headerShadowVisible: false,
            headerTitle: "",
            headerBackVisible: false
          }}
        />
        <View style={commonStyles.flexContainer}>
          <ProfileData logged={false} />
        </View>
      </SafeAreaView >
    </View >
  );
};

export default Profile;
