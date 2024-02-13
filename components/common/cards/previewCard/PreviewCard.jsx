import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./previewCardStyles";
import { COLORS, SIZES } from "../../../../constants"

const PreviewCard = ({ product, colorNote }) => {

    return (
        <View style={styles.wrapper}>
            {product ? (
                <View style={{ height: '70%' }}>
                    <Image
                        source={{
                            uri: product.img
                        }}
                        style={styles.img}
                    />
                </View>
            ) : null}

            {product ? (
                <View>
                    <View style={styles.categoryBrandWrapper}>
                        <View style={styles.brandWrap}>
                            <Text style={styles.brand}>{product.brand}</Text>
                        </View>

                        <View style={styles.categoryWrap}>
                            <Text style={styles.brand}>{product.category}</Text>
                        </View>
                    </View>

                    <View style={styles.categoryBrandWrapper}>
                        <View style={styles.nameWrap}>
                            <View style={{ width: 'auto', height: 40, justifyContent: 'center' }}>
                                <Text style={styles.name}>{product.name}</Text>
                            </View>
                        </View>

                        <View style={styles.noteWrap}>
                            <View style={{ borderRadius: 100, width: 40, height: 40, justifyContent: 'center', backgroundColor: colorNote }}>
                                <Text style={commonStyles.noteText}>{product.score}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            ) : null}


        </View>
    );
};

export default PreviewCard;