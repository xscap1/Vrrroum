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
                <ListedProductCard brand={products[0].brand} name={products[0].name} category={products[0].category} isSponso={true} note={1}/>
                <ListedProductCard brand={products[0].brand} name={products[0].name} category={products[0].category} isSponso={false} note={4}/>
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