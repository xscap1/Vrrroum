import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./listedProductCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"

const ListedProductCard = ({ product, colorNote }) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;

    return (
        <View>
            <View style={commonStyles.subcontainer}>
                {product ? (
                    <View style={wrapperStyle}>
                        <View style={styles.imgContiner}>
                            <Image
                                source={{
                                    uri: product.img
                                }}
                                style={styles.img}
                            />
                        </View>
                        <View style={styles.datasContainer}>
                            {product.isSponso == true ?
                                <View style={styles.sponsoContainer}>
                                    <Text style={styles.sponso}> Sponsorisé </Text>
                                </View> : null}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 2 }}>
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
                            </View>
                        </View>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default ListedProductCard;