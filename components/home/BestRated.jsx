import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList } from "react-native";
import BestRatedCard from "../common/cards/bestRated/BestRatedCard";
import commonStyles from "../../styles/common";
import SeeMoreButton from "../common/buttons/SeeMoreButton";
import {COLORS, SIZES } from "../../constants"

const BestRated = () => {
    const router = useRouter();
    
    const data = ["Nom", "Nom", "Nom", "Nom"];

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Les mieux notés</Text>
            <View style={{marginTop: 10}}>
                <FlatList
                 data={data}
                 renderItem={({ item }) => (
                    <BestRatedCard
                        product={item}
                    />
                 )}
                 keyExtractor={(item) => item.id+1}
                 contentContainerStyle={{ columnGap: SIZES.medium }}
                 horizontal
                 showsHorizontalScrollIndicator={false}
            />
            </View>
            <SeeMoreButton handlePress={() => {router.push(`/bestRated/bestRated`)}}/>
        </View>
    );
};

export default BestRated;