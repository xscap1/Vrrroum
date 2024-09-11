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
        ["plastic"]: "Nettoyant plastique",
        ["universal"] : "Nettoyant universel",
        ["brake"] : "Nettoyant frein",
        ["bugs"] : "Nettoyant insecte",
    })

    const utils = require('../../../../constants/utils');

    return (
        <TouchableOpacity onPress={() => {
            // storeProductInCache(product);
            storeProductInCache(product.id);
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
                                    <View style={{ height: product.isSponso ? '92.5%' : '100%', flexDirection: 'column', width: '100%' }}>
                                        <View style={{ height: '60%' }}>
                                            <View style={{ height: '50%' }}>
                                                <Text numberOfLines={2} style={{ color: COLORS.lightwhite, fontWeight: '500', fontSize: 13 }}>{product.name}</Text>
                                            </View>
                                            <View style={{ height: '50%', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                <Text style={{ color: COLORS.yellow, fontSize: 13 }}>{utils.capitalizeFirstLetter(product.brand)}</Text>
                                                <Text style={{ color: COLORS.subwhite, fontSize: 13 }}>{categoryLocalization[product.category]}</Text>
                                            </View>
                                        </View>

                                        <View style={{ height: '40%' }}>
                                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-end', marginRight: 20, height: '100%' }}>
                                                <View style={{ flexDirection: 'row', width: '40%', gap: 10, height: '100%' }}>
                                                    <View style={{ width: 20, height: 20, backgroundColor: utils.noteToColor(product.score), borderRadius: 100, justifyContent: 'center', alignSelf: 'center' }}>
                                                    </View>
                                                    <View style={{ height: '100%', justifyContent: 'center' }}>
                                                        {product.score > 0 ? <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 11 }}>{utils.formatNote(product.score)}/10</Text> : null}

                                                        <Text style={{ fontWeight: 'bold', color: COLORS.subwhite, fontSize: 11 }}>{utils.noteToText(product.score)}</Text>
                                                    </View>
                                                </View>

                                                {scan ? (
                                                    <View style={commonStyles.scanContainer}>
                                                        <View>
                                                            <Text style={commonStyles.scan}>{product.scans}</Text>
                                                        </View>
                                                        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                            <Text style={commonStyles.scan}> scans</Text>
                                                        </View>
                                                    </View>) : null}
                                            </View>
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