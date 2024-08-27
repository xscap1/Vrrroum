import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import Information from "../Information";
import AuthContext from "../../auth/AuthContext";
import { auth } from "../../../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import commonStyles from "../../../styles/common";
import ProtectedApiRoutes from "../../../api/api";
import { useNavigation } from "expo-router";

const AccountEditor = () => {
    const { user, updateUser } = useContext(AuthContext);

    const [reload, setReload] = useState(false);

    const { PostVerifyEmailToApi } = ProtectedApiRoutes();

    const navigation = useNavigation();

    useEffect(() => {
        updateUser();
    }, []);

    const handleReload = async () => {
        await updateUser();
        setReload(false);
        if (user.emailVerified)
            await PostVerifyEmailToApi(JSON.stringify({ uid: user.uid }));
    }

    const handleEmailVerification = () => {
        sendEmailVerification(user).then(() => {
            setReload(true);
            Alert.alert('Vérification de l\'adresse email.', 'Email de vérification envoyé.');
        })
    }

    return (
        <View>
            {user ?
                <View>
                    <View style={{ marginTop: 20, marginBottom: 20, backgroundColor: COLORS.darkgray, padding: 5, borderRadius: 10 }}>
                        <Information label={'Email'} text={user.email} border={false} />
                        <Information label={'Compte vérifié'} text={user.emailVerified ? "Oui" : "Non"} border={true} />
                    </View>
                    {user.emailVerified ?
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('resetPassword'); }}>
                                <Text style={{ color: COLORS.lightwhite }}>Réinitialiser mon mot de passe</Text>
                            </TouchableOpacity>
                        </View>

                        : null}

                    {!user.emailVerified ?

                        <View style={{ gap: 20 }}>
                            <View style={{ borderWidth: 1, borderColor: 'orange', padding: 10, borderRadius: 10 }}>
                                <Text style={commonStyles.subtextCenterWarning}>
                                    Votre adresse email n'est pas vérifiée. Vous devez vérifier votre adresse email pour modifier votre mot de passe.
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity style={commonStyles.buttonGrayCenter} onPress={handleEmailVerification}>
                                    <Text style={commonStyles.subtextCenter}>Envoyer un email de vérification</Text>
                                </TouchableOpacity>
                            </View>
                            {reload ?
                                <View style={{ marginTop: 20 }}>
                                    <TouchableOpacity style={commonStyles.buttonYellowCenter} onPress={handleReload}>
                                        <Text style={commonStyles.subTextCenterBlack}>Recharger</Text>
                                    </TouchableOpacity>
                                </View>

                                : null}
                        </View> : null}

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('deleteAccount'); }}>
                            <Text style={{ color: COLORS.lightwhite }}>Supprimer mon compte</Text>
                        </TouchableOpacity>
                    </View>

                </View>


                : null}
        </View>
    );
}

export default AccountEditor;