import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useContext } from 'react';
import Pricings from "../../../components/profile/pricing/Pricings";
import AuthContext from "../../../components/auth/AuthContext";

const Pricing = () => {

    const { user } = useContext(AuthContext);

    useEffect(() => {
    }, []);

    return (
        <View style={commonStyles.body}>
            <SafeAreaView style={commonStyles.flexSafeArea}>
                <Stack.Screen
                    options={{
                        headerStyle: commonStyles.header,
                        headerShadowVisible: false,
                        headerTitle: "",
                    }}
                />
                <View style={{
                    paddingTop: 0.05 * ww,
                    paddingLeft: 0.05 * ww,
                    paddingRight: 0.05 * ww,
                    marginBottom: 20,
                    flex: 1
                }}>
                    <Text style={commonStyles.heading}>Abonnements</Text>
                    <ScrollView style={{gap: 20, marginTop: 20}}>
                        <View style={{ gap: 10, marginBottom: 20 }}>
                            <Text style={commonStyles.smallText}>Tous les abonnements se renouvellent automatiquement. Vous pouvez annuler le vôtre à tout moment depuis l'espace de gestion des abonnements ou via votre compte App Store.</Text>
                            <Text style={commonStyles.smallText}>En vous abonnant vous acceptez les conditions générales d'utilisations, de ventes et la politique de confidentialité présentes sur la page de paiement.</Text>
                            {!user ?
                                <Text style={commonStyles.smallText}>Vous n'êtes pas connecté. Il n'est pas nécessaire de s'inscrire pour souscrire à un abonnement. Il est possible de créer un compte ultérieurement pour l'associer à votre abonnement et l'utiliser sur plusieurs appareils. En créant un compte ou en vous connectant, l'abonnement courant sera transféré sur ce compte.</Text>
                                :
                                null}
                        </View>
                        <View style={commonStyles.flexContainerWoPadding}>
                            <Pricings />
                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
        </View>
    );
};

export default Pricing;