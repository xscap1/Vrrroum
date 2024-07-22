import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import commonStyles from "../../../styles/common";
import { COLORS, SIZES, images } from "../../../constants"
import { StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { Dimensions } from "react-native";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import AuthContext from "../../auth/AuthContext";
import SubscriptionContext from "../../sub/SubscriptionContext";
import { useNavigation } from "expo-router";

const FocusPricingCard = ({ card, offer, actual }) => {

    const { user } = useContext(AuthContext);
    const { presentPaywall } = useContext(SubscriptionContext);
    const navigation = useNavigation();

    ww = Dimensions.get('window').width;
    wh = Dimensions.get('window').height;

    var styles = StyleSheet.create({
        cardContainer: {
            borderRadius: 15,
            backgroundColor: COLORS.darkgray,
            height: '90%',
            padding: 15,
            width: 0.85 * ww,
            borderWidth: 2,
            borderColor: COLORS.yellow
        },

        planName: {
            color: COLORS.whitesmoke,
            fontSize: 18,
        },

        priceTag: {
            color: COLORS.whitesmoke,
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 2
        },

        annualPriceTag: {
            color: COLORS.yellow,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 2
        },

        descriptionText: {
            color: COLORS.subwhite,
            marginTop: 30,
            textAlign: 'center'
        },

        button: {
            backgroundColor: COLORS.yellow,
            borderRadius: 10,
            alignItems: 'center',
            padding: 10,
            marginTop: 30
        },

        availableFeature: {
            fontSize: 16,
            color: COLORS.whitesmoke
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
            <Icon name="check" size={18} color={feature.available ? COLORS.whitesmoke : 'gray'} />
            <Text style={feature.available ? styles.availableFeature : styles.disabledFeature}>{feature.text}</Text>
        </View>);
    }

    return (
        <View style={commonStyles.flexContainer}>
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
                        navigation.navigate('login');
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

export default FocusPricingCard;