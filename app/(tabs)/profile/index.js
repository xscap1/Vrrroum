import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Platform, ActivityIndicator, Alert } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import commonStyles from '../../../styles/common';
import ProfileData from '../../../components/profile/ProfileData';
import { configureRCProvider, logOutCustomerFromRCProvider } from '../../../utils/rcprovider';
import {
  GoogleOneTapSignIn,
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
  isErrorWithCode
} from '@react-native-google-signin/google-signin';
let AppleAuthentication;


if (Platform.OS == "ios") {
  AppleAuthentication = require('expo-apple-authentication');
}

const Profile = () => {
  const router = useRouter()

  const [loggedIn, setLoggedIn] = useState(false);
  const [appleCred, setAppleCred] = useState(undefined);
  const [jwt, setJwt] = useState();
  const [user, setUser] = useState(undefined);
  const [jwtExpiration, setJwtExpiration] = useState();
  const [isLoading, setLoading] = useState(true);

  const api = require('../../../api/api');

  const storeJwt = async (token, expirationDate, user) => {
    try {
      console.log(user);
      console.log(typeof(user));
      
      await SecureStore.setItemAsync('jwt', token);
      await SecureStore.setItemAsync('jwtExpiration', expirationDate.toString());
      await SecureStore.setItemAsync('user', JSON.stringify(user));

      console.log("success secureStore");
      await configureRCProvider();
      setLoggedIn(true);
      console.log("Logged in");
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
        await configureRCProvider();
        setLoggedIn(true);
        setJwt(token);
        setJwtExpiration(expirationDate);
      }
    }
    setLoading(false);
  };

  const secureStoreJwt = async (token, user) => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Ajoutez une heure à la date actuelle
    const res = await storeJwt(token, expirationDate, user);
    return res;
  };

  const secureDeleteJwt = async () => {
    try {
      await SecureStore.deleteItemAsync('jwt');
      await SecureStore.deleteItemAsync('jwtExpiration');
      await SecureStore.deleteItemAsync('user');
      await logOutCustomerFromRCProvider();
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
      GoogleSignOut();
      setLoggedIn(false);
      console.log("Logged out");
      return 0;
    }

    return -1;
  };

  const LogIn = async (token, user) => {
    const data = await api.PostUserLoginFromApi(JSON.stringify(user));
    if (data.logged == true) {
      setUser(data.data);
      await secureStoreJwt(token, data.data);
    }

    else {
      Alert.alert('Connexion', 'Erreur lors de la connexion');
    }
  }


  // Somewhere in your code
  const GoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const GoogleSignOut = async () => {
    if (Platform.OS === "android") {
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          const res = await GoogleSignin.signOut();
          console.log("GoogleSignOut");
          return res;
        }
        return null;
      }
  
      catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  // useEffect(() => {
  //   LogOut();
  // }, []);

  useEffect(() => {
    checkJwtExpiration();
  }, []);

  useEffect(() => {
    if (Platform.OS == "android") {
      GoogleSignin.configure();
      console.log("configured");
    }
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
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Text style={commonStyles.subtextCenter}>Devenez membre de Vrrroum pour profiter de toutes les fonctionnalités de Vrrroum.</Text>
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

                          await LogIn(credential.identityToken, user);
                        } catch (e) {
                          if (e.code === 'ERR_REQUEST_CANCELED') {
                            // handle that the user canceled the sign-in flow
                          } else {
                            // handle other errors
                          }
                        }
                      }}
                    /> :
                      <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        onPress={async () => {
                          try {
                            const isSignedIn = await GoogleSignin.isSignedIn();
                            console.log(isSignedIn);
                            await GoogleSignin.hasPlayServices();
                            const userInfo = await GoogleSignin.signIn({
                              scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
                              webClientId: '383293001226-jn9mq1in1pvr5uii5eondmf5sa996ef7.apps.googleusercontent.com'
                            });
                            // const userInfo = await GoogleSignin.signIn({
                            //   scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
                            //   webClientId: '383293001226-u0ap71at1pt6racjlqmaj2sbekere1na.apps.googleusercontent.com'
                            // });

                            if (userInfo) 
                            {
                              const info = userInfo.user;
                              const user = {
                                id : info.id,
                                email : info.email,
                                fullName : info.name,
                                loginsys: "Google"
                              }

                              await LogIn(info.id, user);
                            }

                            // setState({ userInfo });
                          } catch (error) {
                            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                              console.log("SIGN_IN_CANCELLED");
                              // user cancelled the login flow
                            } else if (error.code === statusCodes.IN_PROGRESS) {
                              // operation (e.g. sign in) is in progress already
                              console.log("IN_PROGRESS");
                            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                              // play services not available or outdated
                              console.log("PLAY_SERVICES_NOT_AVAILABLE");
                            } else {
                              // some other error happened
                              console.log(error);
                            }
                          }
                        }} />
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
