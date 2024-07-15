import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import Information from "../Information";
import AuthContext from "../../auth/AuthContext";
import { auth } from "../../../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import commonStyles from "../../../styles/common";

const AccountEditor = () => {
    const { user, updateUser } = useContext(AuthContext);
    console.log(JSON.stringify(user, null, 2));

    const [reload, setReload] = useState(false);

    useEffect(() => {
        updateUser();
    }, []);

    const handleReload = async () => {
        await updateUser();
        setReload(false);
    }

    const handleEmailVerification = () => {
        sendEmailVerification(user).then(() => {
            Alert.alert('Vérification de l\'adresse email.', 'Email de vérification envoyé.');
            setReload(true);
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

                    {!user.emailVerified ?

                        <View style={{ gap: 20 }}>
                            <View style={{ borderWidth: 1, borderColor: 'orange', padding: 10, borderRadius: 10 }}>
                                <Text style={commonStyles.subtextCenterWarning}>
                                    Votre adresse email n'est pas vérifiée. Vous ne pouvez pas souscrire à un abonnement sans compte vérifié.
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity style={commonStyles.buttonGrayCenter} onPress={handleEmailVerification}>
                                    <Text style={commonStyles.subtextCenter}>Envoyer un email de vérification</Text>
                                </TouchableOpacity>
                            </View>
                            {reload ?
                                <View style={{marginTop: 20}}>
                                    <TouchableOpacity style={commonStyles.buttonYellowCenter} onPress={handleReload}>
                                        <Text style={commonStyles.subTextCenterBlack}>Recharger</Text>
                                    </TouchableOpacity>
                                </View>

                                : null}
                        </View> : null}



                </View>


                : null}
        </View>
    );
}

export default AccountEditor;