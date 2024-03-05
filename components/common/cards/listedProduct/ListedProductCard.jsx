import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./listedProductCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"
import { useNavigation } from "expo-router";

const ListedProductCard = ({ product, colorNote, scan }) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.push('product', {
                product: product
            })
        }}>
            <View>
                <View style={commonStyles.subcontainer}>
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
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
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
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 2 }}>
                                <View style={{ paddingVertical: 5 }}>
                                    <Text style={styles.branded}> {product.brand}</Text>
                                </View>
                                <View style={commonStyles.categoryWrap}>
                                    <Text style={commonStyles.category}> {product.category} </Text>
                                </View>
                            </View>
                            <Text numberOfLines={1} style={styles.name}> {product.name} </Text>
                            <View style={styles.noteContainer}>
                                <View style={{ borderRadius: 100, width: 40, height: 40, justifyContent: 'center', backgroundColor: COLORS.background, borderWidth: '1', borderStyle: 'solid', borderColor: colorNote }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontWeight: '800',
                                        fontSize: SIZES.small,
                                        color: colorNote
                                    }}>{product.score}</Text>
                                </View>
                            </View> */}
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ListedProductCard;