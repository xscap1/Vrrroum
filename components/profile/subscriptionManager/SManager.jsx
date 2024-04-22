import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import commonStyles from "../../../styles/common";
import * as Linking from 'expo-linking';

const SManager = ({ offer }) => {

    const [details, setDetails] = useState();
    const [offerIdentifier, setOfferIdentifier] = useState();
    const [period, setPeriod] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [isActive, setIsActive] = useState();
    const [willRenew, setWillRenew] = useState();

    useEffect(() => {
        const o = Object.values(offer)[0]
        setDetails(o);
        // setOfferIdentifier(o.productIdentifier);
        // setPeriod(o.periodType);
        // setExpirationDate(new Date(o.expirationDateMillis));
        // setIsActive(o.isActive);
        // setWillRenew(o.willRenew);
        // console.log(o.isActive);
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
            {details ? (
                <View>
                    <View style={{ backgroundColor: COLORS.darkgray, padding: 5, borderRadius: 10 }}>
                        <Information label={'Offre'} text={details.productIdentifier} border={false} />
                        <Information label={'Actif'} text={details.isActive.toString()} border={true} />
                        <Information label={'Période'} text={details.periodType} border={true} />
                        <Information label={'Renouvelable'} text={details.willRenew.toString()} border={true} />
                        {details.willRenew ? <Information label={'Date de renouvellement'} text={new Date(details.expirationDateMillis).toLocaleString()} border={true} /> : <Information label={'Date d\'expiration'} text={new Date(details.expirationDateMillis).toLocaleString()} border={true} />}
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={commonStyles.subtextCenter}>Membre depuis le {new Date(details.latestPurchaseDateMillis).toLocaleString()}</Text>
                        <TouchableOpacity style={{marginTop: 10}} onPress={() => {Linking.openURL(details.managementURL);}}><Text style={commonStyles.subtextCenter}>Résilier ou modifier mon abonnement</Text></TouchableOpacity>
                    </View>
                </View>
            ) : null
            }
        </View >
    );
};

export default SManager;