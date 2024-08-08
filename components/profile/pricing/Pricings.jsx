import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import PricingCard from "./PricingCard";
import FocusPricingCard from "./FocusPricingCard";
import { getOfferingsFromRCProvider } from "../../../utils/rcprovider";
import SubscriptionContext from "../../sub/SubscriptionContext";

const Pricings = () => {

    const card1 = {
        planName: "Vrrroum +",
        priceTag: "2,99€",
        annualPriceTag: "19,99€",
        annualDiscount: "15,89€",
        descriptionText: "Débloquer toutes les fonctionnalités de Vrrroum. L'essentiel de votre assistant automobile.",
        features: [
            {
                id: 0,
                available: true,
                text: "Nettoyagez plus efficacement grâce à la barre de recherche."
            },
            {
                id: 1,
                available: true,
                text: "Accès total au catalogue des produits"
            },
            {
                id: 2,
                available: true,
                text: "Accéder au classement des meilleurs produits."
            },
            {
                id: 3,
                available: true,
                text: "Accéder au classement des produits les plus scannés."
            }
        ]
    }

    const card2 = {
        planName: "Vrrroum Pro",
        priceTag: "8.99€",
        annualPriceTag: "74,99€",
        annualDiscount: "32,89€",
        descriptionText: "Profiter de tous les avantages du Club Vrrroum. Faîtes des économies et gagner des produits et cadeaux. Pour une aventure automobile à grande vitesse.",
        features: [
            {
                id: 0,
                available: true,
                text: "Tous les avantages de Vrrroum +"
            },
            {
                id: 1,
                available: true,
                text: "Accès au club Vrrroum"
            },
            {
                id: 2,
                available: true,
                text: "Cummul de points sur vos achats"
            }
        ]
    }

    const [offerings, setOfferings] = useState();
    const [activeSubscription, setActiveSubscription] = useState();
    const { subscription } = useContext(SubscriptionContext);

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
                <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                    <FocusPricingCard actual={subscription && subscription.identifier === 'vrrroum_plus_entitlement'} card={card1} offer={offerings.plus_offering} />
                </View>
                // <ScrollView
                //     horizontal={true}
                //     showsHorizontalScrollIndicator={true}
                //     style={{ flex: 1 }}
                //     alwaysBounceHorizontal={true}
                //     bounces={true}
                //     decelerationRate="fast"
                //     contentContainerStyle={{ columnGap: -25 }}
                // >
                //     <FocusPricingCard actual={subscription && subscription.identifier === 'vrrroum_plus_entitlement'} card={card1} offer={offerings.plus_offering} />
                //     <PricingCard actual={subscription && subscription.identifier === 'vrrroum_pro_entitlement'} card={card2} offer={offerings.pro_offering} />
                // </ScrollView> 
                : <ActivityIndicator style={{ flex: 1, alignSelf: 'center' }} />}
        </View >
    );
};

export default Pricings;