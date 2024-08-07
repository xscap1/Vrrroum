import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Platform, ActivityIndicator, Button, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, Linking, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Stack } from "expo-router";
import commonStyles from '../../../styles/common';
import { configureRCProvider, logInCustomerToRCProvider, logOutCustomerFromRCProvider } from '../../../utils/rcprovider';
import { auth } from "../../../firebaseConfig"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from 'expo-router';
import { COLORS } from '../../../constants';
import AuthContext from '../../../components/auth/AuthContext';
import ProtectedApiRoutes from '../../../api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [cgu, setCgu] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [modalResult, setModalResult] = useState(null);
    const { user } = useContext(AuthContext);
    const { PostSignUpUserFromApi } = ProtectedApiRoutes();

    const cguTitle = 'Acceptation des Conditions générales d\'utilisation';
    const cguMessage = "Pour s'inscrire et profiter des services de l'application vous devez accepter les conditions générales d'utilisation et les conditions générales de ventes.";

    const navigation = useNavigation();

    const handleLogin = () => {
        setLoading(true);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);

                if (navigation.canGoBack())
                    navigation.goBack();
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            });
    };

    const handleSignUp = async () => {
        setError('');

        const result = await handleCGU();
        if (!result) {
            setLoading(false);
            return;
        }
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Stocker utilisateur
                if (userCredential) {
                    const res = await PostSignUpUserFromApi(JSON.stringify(userCredential.user));
                    if (res.signup) {
                        setLoading(false);
                        // Redirect to profile
                        if (navigation.canGoBack())
                            navigation.replace('account');
                    }
                }
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            });
    };

    const ConfirmationModal = ({ visible, onClose }) => {
        return (
            <Modal
                animation="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    onClose(null);
                }}
            >
                <View style={{ backgroundColor: COLORS.darkgray, width: '100%', height: '100%', justifyContent: 'center' }}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.subHeadingCenter}>{cguTitle}</Text>
                        <View style={{ marginBottom: 20 }}></View>
                        <Text style={commonStyles.subtextCenter}>{cguMessage}</Text>
                        <View style={{ marginBottom: 20 }}></View>
                        <Text style={commonStyles.subtextCenter}>Consultez sur</Text>
                        <Text style={commonStyles.linkCenter} onPress={() => { Linking.openURL('https://www.vrrroum.com') }}>https://www.vrrroum.com</Text>
                        <View style={{ flexDirection: 'row', gap: 50, marginTop: 50, justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={{ backgroundColor: COLORS.lightgray, padding: 10, borderRadius: 10 }}
                                onPress={() => { onClose(false); }}
                            >
                                <Text style={{ color: COLORS.lightwhite }}>Refuser</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: COLORS.yellow, padding: 10, borderRadius: 10 }}
                                onPress={() => { onClose(true); }}
                            >
                                <Text>Accepter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>);
    }

    const showModal = () => {
        return new Promise((resolve) => {
            setModalVisible(true);
            const handleModalClose = (result) => {
                setModalVisible(false);
                setModalResult(result);
                resolve(result);
            };
            // Utiliser un effet secondaire pour lier la fonction de fermeture
            setModalResult({ handleModalClose });
        });
    };

    const handleCGU = async () => {
        const result = await showModal();
        return result;
        // Faire quelque chose avec le résultat
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 16,
        },
        title: {
            fontSize: 24,
            marginBottom: 16,
            textAlign: 'center',
        },
        input: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            marginBottom: 16,
            paddingHorizontal: 8,
            backgroundColor: 'white'
        },
        error: {
            color: 'red',
            marginBottom: 16,
            textAlign: 'center',
        },
        button: {
            marginTop: 30
        }
    });

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
                        <View style={{ height: '100%', justifyContent: 'center' }}>
                            <Text style={commonStyles.subHeadingCenter}>{isSignUp ? 'Inscription' : 'Connexion'}</Text>
                            <View style={{ marginTop: 20 }}></View>
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholderTextColor={COLORS.lightgray}
                            />
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Mot de passe"
                                value={password}
                                autoCapitalize="none"
                                onChangeText={setPassword}
                                placeholderTextColor={COLORS.lightgray}
                                secureTextEntry
                            />
                            {error ? <Text style={styles.error}>{error}</Text> : null}
                            <View style={{ alignSelf: 'center', alignItems: 'center', gap: 20, marginTop: 20 }}>
                                <TouchableOpacity
                                    style={commonStyles.buttonYellow}
                                    onPress={isSignUp ? handleSignUp : handleLogin}
                                    disabled={loading}>
                                    <Text>{loading ? (isSignUp ? 'Inscription en cours...' : 'Connexion en cours...') : (isSignUp ? 'S\'inscrire' : 'Se connecter')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => setIsSignUp(!isSignUp)}>
                                    <Text style={{ color: COLORS.lightwhite }}>{isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}</Text>
                                </TouchableOpacity>
                                {!isSignUp ?
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('resetPassword'); }}>
                                        <Text style={{ color: COLORS.lightwhite }}>Mot de passe oublié</Text>
                                    </TouchableOpacity>
                                    : null}
                            </View>
                        </View>

                        {modalVisible && modalResult && (
                            <ConfirmationModal visible={modalVisible} onClose={modalResult.handleModalClose} />
                        )}
                    </View>

                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Login;