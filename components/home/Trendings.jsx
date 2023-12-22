import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import TrendingCard from "../common/cards/trendings/TrendingCard";
import commonStyles from "../../styles/common";
import SeeMoreButton from "../common/buttons/SeeMoreButton";
import {COLORS, SIZES } from "../../constants"



const Trendings = () => {
    const router = useRouter();
    
    const data = [1, 2, 3];

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Les tendances</Text>
            <View style={{marginTop: 10}}>
                <FlatList
                 data={data}
                 renderItem={({ item }) => (
                    <TrendingCard
                        product={item}
                    />
                 )}
                 keyExtractor={(item) => item}
                 contentContainerStyle={{ columnGap: SIZES.medium }}
                 horizontal
                 showsHorizontalScrollIndicator={false}
            />
            </View>
            <SeeMoreButton handlePress={() => {router.push(`/trends/trends`)}}/>
        </View>
    );
};

export default Trendings;