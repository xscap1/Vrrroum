import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./listedProductCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"
import { useNavigation } from "expo-router";
import { storeProductInCache } from "../../../../utils";

const ListedProductCard = ({ product, scan }) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;
    const navigation = useNavigation();
    const categoryLocalization = ({
        ["body"]: "Carrosserie",
        ["shampoo"]: "Shampoing",
        ["wax"]: "Cire",
        ["tire"]: "Nettoyant pneus",
        ["rim"]: "Nettoyant jantes",
        ["polish"]: "Polish & Lustreur",
        ["rain"]: "Anti-pluie",
        ["window"]: "Nettoyant vitres",
        ["fog"]: "Anti-buée",
        ["chrome"]: "Chrome & Alu",
        ["dirt"]: "Détachant goudron",
        ["scratches"]: "Efface rayures",
        ["textile"]: "Nettoyant textile",
        ["leather"]: "Nettoyant cuir",
    })

    const utils = require('../../../../constants/utils');

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
                                    <View style={{ height: product.isSponso ? '92.5%' : '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <View>
                                            <View>
                                                <Text numberOfLines={2} style={{ color: COLORS.lightwhite, fontWeight: '500' }}>{product.name}</Text>
                                            </View>
                                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <Text style={{ color: COLORS.yellow, padding: 5 }}>{product.brand}</Text>
                                                </View>
                                                <View style={{ alignSelf: 'center', marginLeft: 10 }}>
                                                    <Text style={{ color: COLORS.subwhite }}>{categoryLocalization[product.category]}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.notationContainer}>

                                            <View style={{ flexDirection: 'row', gap: 10, width: '40%' }}>
                                                <View style={{ width: '20%', height: 20, backgroundColor: utils.noteToColor(product.score), borderRadius: 100, justifyContent: 'center', alignSelf: 'center' }}>

                                                </View>
                                                <View style={{ width: '80%', justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 14 }}>{product.score}/10</Text>
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