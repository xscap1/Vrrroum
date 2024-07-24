import React, { useState, useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { Stack } from "expo-router";
import commonStyles from "../../../styles/common";
import { COLORS } from "../../../constants";
import { auth } from "../../../firebaseConfig"
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "expo-router";
import AuthContext from "../../../components/auth/AuthContext";
import { StackActions } from '@react-navigation/native';

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, handleLogOut } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleResetPassword = () => {
        if (email != "") {
            setLoading(true);

            if (user) {
                handleLogOut();
            }

            sendPasswordResetEmail(auth, email).then(() => {
                setLoading(false);
                Alert.alert("Email de réinitialisation envoyé", "Un email pour réinitialiser votre mot de passe a été envoyé à " + email);
                navigation.dispatch(StackActions.popToTop());
                navigation.navigate('login');
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                        <View style={{ height: '100%', justifyContent: 'center', gap: 20 }}>
                            <View style={{ gap: 36 }}>
                                <Text style={commonStyles.subHeadingCenter}>Mot de passe oublié</Text>
                                <TextInput
                                    style={commonStyles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    placeholderTextColor={COLORS.lightgray}
                                />
                            </View>

                            <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', gap: 15 }}>
                                <TouchableOpacity
                                    style={commonStyles.buttonYellow}
                                    disabled={loading}
                                    onPress={() => { handleResetPassword(); }}
                                >
                                    <Text>Réinitialiser mot de passe</Text>
                                </TouchableOpacity>
                                {user ? <Text style={commonStyles.smalltextCenter}>Réinitialiser votre mot de passe vous déconnectera automatiquement. Vous serez renvoyé vers l'écran de connexion.</Text> : null}
                                <Text style={commonStyles.smalltextCenter}>Un email de réinitialisation vous sera envoyé à l'adresse email donnée.</Text>
                            </View>

                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default ResetPassword