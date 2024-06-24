import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./listedProductCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"
import { useNavigation } from "expo-router";
import { storeProductInCache } from "../../../../utils";

const ListedProductCard = ({ product, colorNote, scan }) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            storeProductInCache(product);
            navigation.push('product');
        }}>
            <View>
                <View style={styles.container}>
                    {product ? (
                        <View style={wrapperStyle}>
                            <View style={styles.imgContiner}>
                                <Image
                                    source={{
                                        uri: product.img == null ? product.imgUrl : product.img
                                    }}
                                    style={styles.img}
                                />
                            </View>
                            <View style={styles.datasContainer}>
                                {product.isSponso == true ?
                                    <View>
                                        <Text style={{
                                            fontSize: SIZES.small,
                                            color: COLORS.subwhite,
                                            marginBottom: 5
                                        }}>Sponsorisé</Text>
                                    </View> : null}
                                <View>
                                    {/* backgroundColor: COLORS.background, borderRadius: 100, borderWidth: 1, borderColor: COLORS.yellow,  */}
                                    <View>
                                        <Text numberOfLines={2} style={{ color: COLORS.lightwhite, fontWeight: '500' }}>{product.name}</Text>
                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                        <View style={{ alignSelf: 'flex-start' }}>
                                            <Text style={{ color: COLORS.yellow, padding: 5 }}>{product.brand}</Text>
                                        </View>
                                        <View style={{ alignSelf: 'center', marginLeft: 10 }}>
                                            <Text style={{ color: COLORS.subwhite }}>{product.category}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.notationContainer}>
                                        <View style={{ marginLeft: 20 }}>
                                            <View style={[styles.scoreContainer, { borderColor: colorNote }]}>
                                                <Text style={
                                                    [styles.scoreText, { color: colorNote }]
                                                }>{product.score}</Text>
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
                                            </View>) : null}
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ListedProductCard;