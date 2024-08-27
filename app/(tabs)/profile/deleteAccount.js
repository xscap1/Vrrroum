import React, { useState, useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { Stack } from "expo-router";
import commonStyles from "../../../styles/common";
import { COLORS } from "../../../constants";
import { auth } from "../../../firebaseConfig"
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "expo-router";
import AuthContext from "../../../components/auth/AuthContext";
import SubscriptionContext from "../../../components/sub/SubscriptionContext";

const DeleteAccount = () => {

    const [loading, setLoading] = useState(false);
    const { user, handleLogOut, deleteUser } = useContext(AuthContext);
    const { subscription } = useContext(SubscriptionContext);
    const navigation = useNavigation();

    const handleDeleteUser = async () => {
        try {
            const res = await deleteUser();
            if (res) {
                Alert.alert("Suppression réussie", "Votre compte a bien été supprimé.");
                navigation.replace('index');
            }
        }

        catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue lors de la suppression de votre compte.");
            console.log(error);
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
                            <View style={{ gap: 20 }}>
                                <Text style={commonStyles.subHeadingCenter}>Suppression du compte</Text>
                                <Text style={commonStyles.smalltextCenter}>Vous êtes sur le point de supprimer définitivement votre compte. Aucunes demandes de rétablissement du compte ne sera acceptée. Vous devez désactiver votre abonnement avant suppression. Nous vous invitons à vous rendre sur l'espace de gestion d'abonnement.</Text>
                            </View>

                            <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', gap: 15 }}>
                                <TouchableOpacity
                                    style={commonStyles.buttonYellow}
                                    disabled={loading}
                                    onPress={() => {
                                        if (subscription) {
                                            Alert.alert("Abonnement en cours", "Vous devez arrêter votre abonnement en cours avant de supprimer votre compte pour éviter d'être débité à nouveau à cause de limitations de l'App Store.")
                                        }

                                        else {
                                            Alert.alert("Suppression du compte", "Êtes-vous réellement sûr de vouloir supprimer votre compte?", [{ text: "Supprimer", onPress: async () => await handleDeleteUser() }]);
                                        }

                                    }}
                                >
                                    <Text>Supprimer mon compte</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default DeleteAccount