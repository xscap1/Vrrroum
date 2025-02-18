import React from "react";
import { View, Text, Image, Button, Linking, TouchableOpacity } from "react-native";
import { COLORS } from "../../../../constants";
import commonStyles from "../../../../styles/common";

const Compare = ({ compareList }) => {
    return (
        <View style={{ marginTop: 20 }}>
            {compareList.map((compare, index) => (
                <PriceCompare key={index} compare={compare} />
            ))}
        </View>
    );
};

const PriceCompare = ({ compare }) => {
    const { name, price, logo, link } = compare;

    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 5 }}>
            <Text style={{ flex: 3, marginRight: 10, color: COLORS.mainText, fontWeight: "bold", fontSize: 10 }}>{name}</Text>
            <Text style={{ flex: 3, marginRight: 10, color: COLORS.mainText, fontWeight: "bold", fontSize: 20 }}>{price}€</Text>
            <Image source={{ uri: logo }} style={{ flex: 1, width: 20, height: 20, marginRight: 10, color: COLORS.mainText }} />
            <View style={{ flex: 3 }}>
                <TouchableOpacity 
                    style={{padding: 5, borderRadius: 5, alignItems: "center", backgroundColor: COLORS.yellow}}
                    onPress={() => Linking.openURL(link)}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 12, textAlign: "center"}}>Voir l'offre</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Compare;