import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import commonStyles from '../../../styles/common';
import ProfileData from '../../../components/profile/ProfileData';

let AppleAuthentication;

if (Platform.OS == "ios") {
  AppleAuthentication = require('expo-apple-authentication');
}

const Profile = () => {
  const router = useRouter()

  const [loggedIn, setLoggedIn] = useState(false);
  const [appleCred, setAppleCred] = useState(undefined);
  const [jwt, setJwt] = useState();
  const [jwtExpiration, setJwtExpiration] = useState();
  const [isLoading, setLoading] = useState(true);

  const api = require('../../../api/api');

  const storeJwt = async (token, expirationDate) => {
    try {
      const t = await SecureStore.setItemAsync('jwt', token);
      const d = await SecureStore.setItemAsync('jwtExpiration', expirationDate.toString());
      setJwt(t);
      setJwtExpiration(d);
      console.log("success secureStore");
      return 0;
    }
    catch (error) {
      console.log("Erreur lors du stockage du JWT : ", error);
      return -1;
    }
  };

  const checkJwtExpiration = async () => {
    const expirationDateString = await SecureStore.getItemAsync('jwtExpiration');
    if (expirationDateString) {
      const expirationDate = new Date((expirationDateString));
      if (expirationDate < new Date()) {
        // Token expiré, se déconnecter
        LogOut();
      } else {
        // Token valide, récupérer le JWT
        const token = await SecureStore.getItemAsync('jwt');
        setLoggedIn(true);
        setJwt(token);
        setJwtExpiration(expirationDate);
      }
    }
    setLoading(false);
  };

  const secureStoreJwt = async (token) => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Ajoutez une heure à la date actuelle
    const res = await storeJwt(token, expirationDate);
    return res;
  };

  const secureDeleteJwt = async () => {
    try {
      await SecureStore.deleteItemAsync('jwt');
      await SecureStore.deleteItemAsync('jwtExpiration');
      return 0;
    }

    catch (e) {
      console.error(e);
      return -1;
    }
  };

  const LogOut = async () => {
    const res = await secureDeleteJwt();
    if (res == 0) {
      setLoggedIn(false);
      setJwt(undefined);
      setJwtExpiration(undefined);
      console.log("Logged out");
      return 0;
    }

    return -1;
  };

  const LogIn = async (token, user) => {
    api.PostUserLoginFromApi(JSON.stringify(user));
    const res = await secureStoreJwt(token);
    if (res == 0) {
      setLoggedIn(true);
      console.log("Logged in");
      return 0;
    }

    return -1;
  }

  useEffect(() => {
    checkJwtExpiration();
  }, []);

  // useEffect(() => {
  //   secureStoreJwt(jwt);
  // }, [jwt]);

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
        {isLoading ?
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
          :
          <View style={commonStyles.flexContainer}>
            {loggedIn ?
              <View style={{ alignSelf: 'center', marginTop: 70 }}>
                <TouchableOpacity onPress={async () => {
                  await LogOut();
                }}>
                  <Text style={commonStyles.subtext}>Se déconnecter</Text>
                </TouchableOpacity>
              </View> :

              <View>
                <View style={{alignItems: 'center', marginTop: 20}}>
                  <Text style={commonStyles.subtextCenter}>Connectez-vous pour profiter de toutes les fonctionnalités de Vrrroum.</Text>
                </View>
                <View style={{ alignSelf: 'center', marginTop: 40 }}>
                  {jwt ? null :
                    Platform.OS == "ios" ? <AppleAuthentication.AppleAuthenticationButton
                      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                      cornerRadius={5}
                      style={{
                        width: 200,
                        height: 44,
                      }}
                      onPress={async () => {
                        try {
                          const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                              AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                          });
                          // signed in

                          const user = {
                            id: credential.user,
                            email: credential.email,
                            fullName: credential.fullName,
                            loginsys: "Apple",
                          }

                          LogIn(credential.identityToken, user);
                        } catch (e) {
                          if (e.code === 'ERR_REQUEST_CANCELED') {
                            // handle that the user canceled the sign-in flow
                          } else {
                            // handle other errors
                          }
                        }
                      }}
                    /> : null
                  }
                </View>
              </View>
            }

            <ProfileData logged={loggedIn} />
          </View>}

      </SafeAreaView>
    </View>
  );
};

export default Profile;
