import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, Platform, ActivityIndicator, Alert } from "react-native";
import commonStyles from "../../../styles/common";
import { COLORS, SIZES, images } from "../../../constants"
import PricingCard from "./PricingCard";
import FocusPricingCard from "./FocusPricingCard";
import { getOfferingsFromRCProvider } from "../../../utils/rcprovider";

const APIKeys = {
    apple: "appl_TSXyjYXVGQMQOMWTXPTyyTAvwtc",
    google: "your_revenuecat_google_api_key",
};

const Pricings = () => {

    const card1 = {
        planName: "Vrrroum Lite",
        priceTag: "2,99€",
        annualPriceTag: "19,99€",
        annualDiscount: "15,89€",
        descriptionText: "Je suis la description",
        features: [
            {
                id: 0,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 1,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 2,
                available: false,
                text: "Je suis une feature"
            },
            {
                id: 3,
                available: false,
                text: "Je suis une feature"
            },
            {
                id: 4,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 5,
                available: true,
                text: "Je suis une feature"
            }
        ]
    }

    const card2 = {
        planName: "Vrrroum +",
        priceTag: "4,99€",
        annualPriceTag: "39,99€",
        annualDiscount: "19,89€",
        descriptionText: "Je suis la description",
        features: [
            {
                id: 0,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 1,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 2,
                available: false,
                text: "Je suis une feature"
            },
            {
                id: 3,
                available: false,
                text: "Je suis une feature"
            },
            {
                id: 4,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 5,
                available: true,
                text: "Je suis une feature"
            }
        ]
    }

    const card3 = {
        planName: "Vrrroum Pro",
        priceTag: "9.99€",
        annualPriceTag: "89,99€",
        annualDiscount: "29,89€",
        descriptionText: "Je suis la description",
        features: [
            {
                id: 0,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 1,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 2,
                available: false,
                text: "Je suis une feature"
            },
            {
                id: 3,
                available: false,
                text: "Je suis une feature"
            },
            {
                id: 4,
                available: true,
                text: "Je suis une feature"
            },
            {
                id: 5,
                available: true,
                text: "Je suis une feature"
            }
        ]
    }

    const [offerings, setOfferings] = useState();
    const [activeSubscription, setActiveSubscription] = useState();

    useEffect(() => {
        const setupOfferings = async () => {
            const offerings = await getOfferingsFromRCProvider();
            if (offerings.all != null && offerings.all != undefined) {
                setOfferings(offerings.all);
            }
        };
        setupOfferings().catch(console.log);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {offerings ?
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={{ flex: 1 }}
                    alwaysBounceHorizontal={true}
                    bounces={true}
                    decelerationRate="fast"
                    contentContainerStyle={{ columnGap: -25 }}
                >
                    <PricingCard card={card1} offer={offerings.lite_offering} />
                    <FocusPricingCard card={card2} offer={offerings.plus_offering} />
                    <PricingCard card={card3} offer={offerings.pro_offering} />
                </ScrollView> : <ActivityIndicator style={{ flex: 1, alignSelf: 'center' }} />}
        </View >
    );
};

export default Pricings;