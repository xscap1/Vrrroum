import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import commonStyles from "../../../styles/common";
import { COLORS, SIZES, images } from "../../../constants"
import { StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { Dimensions } from "react-native";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import * as SecureStore from 'expo-secure-store';
import AuthContext from "../../auth/AuthContext";
import SubscriptionContext from "../../sub/SubscriptionContext";
import { useNavigation } from "expo-router";

const PricingCard = ({ card, offer, actual }) => {

    const { user } = useContext(AuthContext);
    const { presentPaywall } = useContext(SubscriptionContext);
    const navigation = useNavigation();

    ww = Dimensions.get('window').width;
    wh = Dimensions.get('window').height;

    var styles = StyleSheet.create({
        cardContainer: {
            borderRadius: 15,
            backgroundColor: COLORS.whitesmoke,
            height: '70%',
            padding: 15,
            marginTop: 55,
            width: 0.85 * ww
        },

        planName: {
            color: COLORS.background,
            fontSize: 18,
        },

        priceTag: {
            color: COLORS.background,
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 2
        },

        annualPriceTag: {
            color: 'gray',
            fontSize: 16,
            marginTop: 2
        },

        descriptionText: {
            color: COLORS.lightgray,
            marginTop: 30,
            textAlign: 'justify'
        },

        button: {
            backgroundColor: COLORS.gainsbora,
            borderRadius: 10,
            alignItems: 'center',
            padding: 10,
            marginTop: 30
        },

        availableFeature: {
            fontSize: 16
        },

        disabledFeature: {
            fontSize: 16,
            color: 'gray'
        },

        featuresContainer: {
            marginTop: 30
        },

        singleFeatureContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            marginTop: 10
        },
    });

    const Feature = ({ feature }) => {
        return (<View style={styles.singleFeatureContainer}>
            <Icon name="check" size={18} color={feature.available ? 'black' : 'gray'} />
            <Text style={feature.available ? styles.availableFeature : styles.disabledFeature}>{feature.text}</Text>
        </View>);
    }

    return (
        <View style={commonStyles.flexContainer}>
            <View style={{ marginBottom: 10 }}></View>
            <View style={styles.cardContainer}>
                {actual ?
                    <View>
                        <Text style={commonStyles.subtextCenter}>Votre abonnement actuel</Text>
                        <View style={{ marginBottom: 10 }}></View>
                    </View> : null}

                <Text style={styles.planName}>{card.planName}</Text>
                <Text style={styles.priceTag}>{card.priceTag}/mois</Text>
                <Text style={styles.annualPriceTag}>ou {card.annualPriceTag}/an soit {card.annualDiscount} de moins</Text>

                <TouchableOpacity style={styles.button} onPress={() => {
                    if (user) {
                        if (user.emailVerified)
                            presentPaywall(user, offer);
                        else {
                            Alert.alert('Vérification email', 'Vous devez vérifier votre compte avant de souscrire à un abonnement');
                            navigation.navigate('account');
                        }
                    }
                    else {
                        Alert.alert('Connexion', 'Vous devez être connecté pour souscrire à un abonnement.');
                        navigation.replace('login');
                    }
                }}>
                    <Text>S'abonner</Text>
                </TouchableOpacity>

                <Text style={styles.descriptionText}>{card.descriptionText}</Text>
                <View style={styles.featuresContainer}>
                    {
                        card.features.map(function (item, i) {
                            return <Feature
                                key={i}
                                feature={item}
                            />
                        })
                    }
                </View>
            </View>
        </View>
    );

};

export default PricingCard;