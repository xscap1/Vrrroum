import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./previewCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"
import { useNavigation } from "expo-router";

const PreviewCard = ({ product, colorNote, scan }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('product', {
                product: product
            })
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
                            <Text style={{ fontSize: SIZES.medium, color: COLORS.lightwhite }}>{product.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 5, alignItems: 'center' }}>
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

                            <View style={{ marginLeft: 20 }}>
                                <View style={{ borderRadius: 100, width: 40, height: 40, justifyContent: 'center', backgroundColor: COLORS.background, borderWidth: '1', borderStyle: 'solid', borderColor: colorNote }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontWeight: '500',
                                        fontSize: SIZES.medium,
                                        marginTop: 0,
                                        width: 40,
                                        color: colorNote
                                    }}>{product.score}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

export default PreviewCard;