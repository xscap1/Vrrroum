import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./categoryCardStyle";
import { COLORS, SIZES } from "../../../../constants";
import { Link } from "expo-router";

const CategoryCard = ({ category }) => {
    return (
        <Link href={{
            pathname: `/home/category`,
            params: { category: category.cat, name: category.name }
        }} asChild>
            <Pressable>
                <View style={commonStyles.categoryContainer}>
                    <View style={styles.wrapper}>
                        <Image source={category.icon} style={styles.icon} />
                        <View style={styles.nameContainer}>
                            <Text style={commonStyles.text}>{category.name}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Link>
    );
};

export default CategoryCard;