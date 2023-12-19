import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import ProductCard from "../common/cards/ProductCard";
import commonStyles from "../../styles/common";
import SeeMoreButton from "../common/buttons/SeeMoreButton";
import {COLORS, SIZES } from "../../constants"

const BestRated = () => {
    const router = useRouter();
    
    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Les mieux notés</Text>
            <View style={commonStyles.subcontainer}>
                <ProductCard/>
            </View>
            <SeeMoreButton handlePress={() => {router.push(`/bestRated/bestRated`)}}/>
        </View>
    );
};

export default BestRated;