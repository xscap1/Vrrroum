import React, { useState, useEffect, useContext } from "react";
import { Link, useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import commonStyles from "../../../styles/common";
import * as Linking from 'expo-linking';
import SubscriptionContext from "../../sub/SubcriptionContext";


const SManager = () => {

    const { subscription, managementUrl } = useContext(SubscriptionContext);
    const [subType, setSubType] = useState("");

    useEffect(() => {
        if (subscription) {
            switch (subscription.identifier) {
                case 'vrrroum_plus_entitlement':
                    setSubType("Vrrroum +");
                    break;
                case 'vrrroum_pro_entitlement':
                    setSubType("Vrrroum Club");
                    break;
                default:
                    return;
            }
        }


    }, []);

    const Information = ({ label, text, border }) => {
        return (
            <View style={{ padding: 5 }}>
                {border ? <View style={{ width: '100%', height: 1, backgroundColor: COLORS.lightwhite }}></View> : null}
                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, padding: 5 }}>
                    <View style={{ width: '40%', padding: 5 }}><Text style={{ color: COLORS.lightwhite, fontSize: SIZES.medium }}>{label}</Text></View>
                    <View style={{ width: '60%', padding: 5 }}><Text style={{ color: COLORS.subwhite, fontSize: SIZES.medium, alignSelf: 'flex-end' }}>{text}</Text></View>
                </View>
            </View>
        );
    }

    return (
        <View style={{ marginTop: 20 }}>
            {subscription ? (
                <View>
                    <View style={{ backgroundColor: COLORS.darkgray, padding: 5, borderRadius: 10 }}>
                        <Information label={'Offre'} text={subType} border={false} />
                        <Information label={'Actif'} text={subscription.isActive ? "Oui" : "Non"} border={true} />
                        {/* <Information label={'Période'} text={subscription.periodType} border={true} /> */}
                        <Information label={'Renouvelable'} text={subscription.willRenew ? "Oui" : "Non"} border={true} />
                        {subscription.willRenew ? <Information label={'Date de renouvellement'} text={new Date(subscription.expirationDateMillis).toLocaleString()} border={true} /> : null}
                        <Information label={'Expire le'} text={new Date(subscription.expirationDateMillis).toLocaleString()} border={true} />
                        {subscription.unsubscribeDetectedAtMillis ?
                            <Information label={'Désabonnement effectué le'} text={new Date(subscription.unsubscribeDetectedAtMillis).toLocaleString()} border={true} />
                            : null}
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={commonStyles.subtextCenter}>Membre depuis le {new Date(subscription.latestPurchaseDateMillis).toLocaleString()}</Text>

                        {managementUrl ?
                            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { Linking.openURL(""); }}><Text style={commonStyles.subtextCenter}>Résilier ou modifier mon abonnement</Text></TouchableOpacity>
                            :
                            null}
                    </View>
                </View>
            ) : null
            }
        </View >
    );
};

export default SManager;