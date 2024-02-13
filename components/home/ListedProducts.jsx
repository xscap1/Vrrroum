import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList } from "react-native";
import ListedProductCard from "../common/cards/listedProduct/ListedProductCard";
import commonStyles from "../../styles/common";
import SeeMoreButton from "../common/buttons/SeeMoreButton";
import {COLORS, SIZES } from "../../constants"

const ListedProducts = ({products}) => {
    const router = useRouter();
    
    const data = [1, 2, 3];

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Les mieux notés</Text>
            <Text style={commonStyles.subtext}>Voici notre sélection des meilleurs produits de cette semaine</Text>
            <View style={{marginTop: 10}}>
                <ListedProductCard product={products[0]}/>
                <ListedProductCard product={products[1]}/>
                {/* <FlatList
                 data={data}
                 renderItem={({ item }) => (
                    <BestRatedCard
                        product={item}
                    />
                 )}
                 keyExtractor={(item) => item}
                 contentContainerStyle={{ columnGap: SIZES.medium }}
                 horizontal
                 showsHorizontalScrollIndicator={false}
            /> */}
            </View>
        </View>
    );
};

export default ListedProducts;