import React from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import commonStyles from "../../../styles/common";
import { COLORS, SIZES, images } from "../../../constants"
import PricingCard from "./PricingCard";
import FocusPricingCard from "./FocusPricingCard";

const Pricings = () => {

    const card1 = {
        planName: "Card1",
        priceTag: "2.99€",
        descriptionText: "Je suis la description",
        features: [
            {
                id: 0,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 1,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 2,
                available: false,
                text : "Je suis une feature"
            },
            {
                id: 3,
                available: false,
                text : "Je suis une feature"
            },
            {
                id: 4,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 5,
                available: true,
                text : "Je suis une feature"
            }
        ]
    }

    const card2 = {
        planName: "Card2",
        priceTag: "4.99€",
        descriptionText: "Je suis la description",
        features: [
            {
                id: 0,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 1,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 2,
                available: false,
                text : "Je suis une feature"
            },
            {
                id: 3,
                available: false,
                text : "Je suis une feature"
            },
            {
                id: 4,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 5,
                available: true,
                text : "Je suis une feature"
            }
        ]
    }

    const card3 = {
        planName: "Card3",
        priceTag: "9.99€",
        descriptionText: "Je suis la description",
        features: [
            {
                id: 0,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 1,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 2,
                available: false,
                text : "Je suis une feature"
            },
            {
                id: 3,
                available: false,
                text : "Je suis une feature"
            },
            {
                id: 4,
                available: true,
                text : "Je suis une feature"
            },
            {
                id: 5,
                available: true,
                text : "Je suis une feature"
            }
        ]
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                style={{ flex: 1 }}
                alwaysBounceHorizontal={true}
                bounces={true}
                decelerationRate="fast"
                contentContainerStyle={{ columnGap: -25 }}
                >
                <PricingCard card={card1}/>
                <FocusPricingCard card={card2}/>
                <PricingCard card={card3}/>
            </ScrollView>
        </View>
    );
};

export default Pricings;