import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./previewCardStyles";
import { COLORS, SIZES } from "../../../../constants"

const PreviewCard = ({ product, colorNote, scan }) => {

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
                            <Text style={styles.category}>{product.category}</Text>
                        </View>

                        {scan ? (
                            <View style={styles.scanWrap}>
                                <Text style={styles.scan}>{product.scans}</Text>
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
                    </View>
                </View>
            ) : null}


        </View>
    );
};

export default PreviewCard;