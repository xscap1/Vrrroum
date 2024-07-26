import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./previewCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"
import { useNavigation } from "expo-router";
import { storeProductInCache } from "../../../../utils";

const PreviewCard = ({ product, colorNote, scan }) => {

    const navigation = useNavigation();

    const utils = require('../../../../constants/utils');

    return (
        <TouchableOpacity onPress={() => {
            storeProductInCache(product.id);
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

                            <View style={{ flexDirection: 'row', gap: 10, width: '40%' }}>
                                <View style={{ width: '20%', height: 20, backgroundColor: utils.noteToColor(product.score), borderRadius: 100, justifyContent: 'center', alignSelf: 'center' }}>

                                </View>
                                <View style={{ width: '80%', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 14 }}>{product.score.toFixed(1)}/10</Text>
                                    <Text style={{ fontWeight: 'bold', color: COLORS.subwhite, fontSize: 12 }}>{utils.noteToText(product.score)}</Text>
                                </View>
                            </View>

                            {scan ? (
                                <View style={commonStyles.scanContainer}>
                                    <View>
                                        <Text style={commonStyles.scan}>{product.scans}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                        {/* <Image
                                                            source={icons.flame}
                                                            style={styles.icon}
                                                        /> */}
                                        <Text style={commonStyles.scan}> scans</Text>
                                    </View>
                                </View>) : null}
                        </View>
                        {/* <View style={styles.notationContainer}>
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
                        </View> */}
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

export default PreviewCard;