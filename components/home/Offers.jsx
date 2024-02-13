import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import OfferCard from "../common/cards/offers/OfferCard";
import commonStyles from "../../styles/common";
import {COLORS, SIZES, images } from "../../constants"

const Offers = () => {
    const router = useRouter();
    
    const data = [images.offer1, images.offer2, images.offer3];

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Les offres du jour</Text>
            <View style={{marginTop: 15}}>
                <FlatList
                 data={data}
                 renderItem={({ item }) => (
                    <OfferCard image={item}
                    />
                 )}
                 keyExtractor={(item) => item}
                 contentContainerStyle={{ columnGap: SIZES.medium }}
                 horizontal
                 showsHorizontalScrollIndicator={false}
            />
            </View>
        </View>
    );
};

export default Offers;