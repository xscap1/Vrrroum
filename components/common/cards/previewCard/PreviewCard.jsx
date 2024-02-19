import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./previewCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"

const PreviewCard = ({ product, colorNote, scan }) => {

    return (
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

                    {/* <View style={styles.categoryBrandWrapper}>
                        <View style={styles.brandWrap}>
                            <Text style={styles.brand}>{product.brand}</Text>
                        </View>

                        <View style={styles.categoryWrap}>
                            <Text style={styles.category}>{product.category}</Text>
                        </View>

                        {scan ? (
                            <View style={styles.scanContainer}>
                                
                                <View>
                                    <Text style={styles.scan}>{product.scans}</Text>
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

                    <View style={styles.categoryBrandWrapper}>
                        <View style={styles.nameWrap}>
                            <View style={{ width: 'auto', height: 40, justifyContent: 'center' }}>
                                <Text style={styles.name}>{product.name}</Text>
                            </View>
                        </View>

                        <View style={styles.noteWrap}>
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
                    </View> */}
                </View>
            ) : null}


        </View>
    );
};

export default PreviewCard;