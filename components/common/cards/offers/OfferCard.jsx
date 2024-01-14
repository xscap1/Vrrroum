import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./offerCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants";

const OfferCard = ({image}) => {
    return (
        <View style={styles.wrapper}>
            <Image source={image} style={styles.image} resizeMode="contain"/>
        </View>
    );
};

export default OfferCard;