import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./categoryCardStyle";
import { COLORS, SIZES } from "../../../../constants";

const CategoryCard = ({icon, name}) => {
    return (
        <View style={commonStyles.subcontainer}>
            <View style={styles.wrapper}>
                <Image source={icon} style={styles.icon} />
                <View style={styles.nameContainer}>
                    <Text style={commonStyles.text}>{name}</Text>
                </View>
            </View>
        </View>
    );
};

export default CategoryCard;