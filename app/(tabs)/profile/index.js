import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Platform, ActivityIndicator, Alert, StyleSheet, TextInput } from "react-native";
import { Stack } from "expo-router";
import commonStyles from '../../../styles/common';
import ProfileData from '../../../components/profile/ProfileData';
// import { useNavigation } from "expo-router";
// import AuthContext from '../../../components/auth/AuthContext';

const Profile = () => {

  // const navigation = useNavigation();
  // const { user, loading, handleLogOut } = useContext(AuthContext);

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
          {/* <TouchableOpacity
            style={commonStyles.buttonYellowCenter}
            onPress={() => {
              if (user)
                handleLogOut();
              else
                navigation.navigate('login');
            }}
          >
            <Text style={{ textAlign: 'center' }}>{user ? 'Déconnexion' : 'Connexion'}</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView >
    </View >
  );
};

export default Profile;
