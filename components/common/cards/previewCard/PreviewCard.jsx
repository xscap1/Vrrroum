import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./previewCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"
import { useNavigation } from "expo-router";
import { storeProductInCache } from "../../../../utils";

const PreviewCard = ({ product, colorNote, scan }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            storeProductInCache(product);
            navigation.navigate('product');
        }}>
            <View style={styles.wrapper}>
                {product ? (
                    <View style={{ height: '65%', backgroundColor: 'white', borderRadius: 10 }}>
                        <Image
                            source={{
                                uri: product.img == null ? product.imgUrl : product.img
                            }}
                            style={styles.img}
                        />
                    </View>
                ) : null}

                {product ? (
                    <View>

                        <View style={{ marginTop: 15, height: '35%' }}>
                            <Text style={{ fontSize: SIZES.xMedium, color: COLORS.lightwhite }}>{product.name}</Text>
                        </View>
                        <View style={styles.notationContainer}>
                            <View style={{ marginLeft: 20 }}>
                                <View style={[styles.scoreContainer, { borderColor: colorNote }]}>
                                    <Text style={[styles.scoreText, {color: colorNote}]}>{product.score}</Text>
                                </View>
                            </View>

                            {scan ? (
                                <View style={commonStyles.scanContainer}>
                                    <View>
                                        <Text style={commonStyles.scan}>{product.scans}</Text>
                                    </View>
                                    <View>
                                        <Image
                                            source={icons.flame}
                                            style={styles.icon}
                                        />
                                    </View>
                                </View>
                            ) : null}
                        </View>
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

export default PreviewCard;