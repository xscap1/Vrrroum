import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import commonStyles from "../../../styles/common";
import { COLORS, SIZES, images } from "../../../constants"
import { StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { Dimensions } from "react-native";

const PricingCard = ({ card }) => {

    ww = Dimensions.get('window').width;
    wh = Dimensions.get('window').height;

    var styles = StyleSheet.create({
        cardContainer: {
            borderRadius: 15,
            backgroundColor: COLORS.whitesmoke,
            height: '70%',
            padding: 15,
            marginTop: 30,
            width: 0.75 * ww
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

        descriptionText: {
            color: COLORS.lightgray,
            marginTop: 30,
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
            <View style={styles.cardContainer}>
                <Text style={styles.planName}>{card.planName}</Text>
                <Text style={styles.priceTag}>{card.priceTag}/mois</Text>

                <TouchableOpacity style={styles.button}>
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