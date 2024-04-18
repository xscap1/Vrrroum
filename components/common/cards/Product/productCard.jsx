import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./productCardStyles";
import { COLORS, SIZES, icons } from "../../../../constants"
import Details from "../../products/details/details";
import Recommendations from '../../products/recommendations/recommendations';
import { Icon } from '@rneui/themed';
import { CheckPresentInFavorite, removeFavoriteByIdInCache, storeFavoritesInCache } from '../../../../utils';
import DisplayTextInformations from '../DisplayTextInformations';


const ProductCard = ({ product, colorNote, scan }) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;

    const [show, setShow] = useState(true);
    const [switchIcon, setSwitchIcon] = useState(false);

    const priceCompareText = "Cette fonctionnalité sera bientôt disponible \! L\'équipe Vrrroum travaille dur pour vous offrir la solution d'achat en ligne la plus économique.";
    const envText = "Cette fonctionnalité sera bientôt disponible \! L\'équipe Vrrroum travaille dur pour vous donner la possibilité d'analyser l'impact environnemental d'un produit.";

    async function addProductToFavorites() {
        const res = await storeFavoritesInCache(product.id);
        if (res == -1) {
            const removed = await removeFavoriteByIdInCache(product.id);
            if (removed >= 0)
                setSwitchIcon(false);
        }
        if (res == -2)
            alert("Votre liste des favoris est pleine");
        return res;
    }

    useEffect(() => {

        async function check() {
            const res = await CheckPresentInFavorite(product.id);
            console.log("present ? :" + res);
            if (res)
                setSwitchIcon(true);
        }

        check();

    }, [switchIcon]);

    return (
        <View style={commonStyles.flexContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
                            </View>
                        </View>
                    ) : null}
                </View>

                <TouchableOpacity style={{ display: "flex", flexDirection: "row", gap: 5, marginTop: 20, justifyContent: 'flex-end' }} onPress={async () => { const res = await addProductToFavorites(); if (res == 0) setSwitchIcon(true); }}>
                    <Text style={commonStyles.subtext}>{switchIcon ? "Ajouté" : "Ajouter aux favoris"}</Text>
                    <Icon name={switchIcon ? 'favorite' : 'favorite-border'} type='material' color={COLORS.yellow} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity style={{ alignSelf: 'center', width: '80%' }} disabled={show} onPress={() => setShow(!show)}>
                            <View style={show ? commonStyles.dataActiveButton : commonStyles.dataInactiveButton}>
                                <Text style={show ? commonStyles.activeText : commonStyles.inactiveText}>Informations</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity style={{ alignSelf: 'center', width: '80%' }} disabled={!show} onPress={() => setShow(!show)}>
                            <View style={!show ? commonStyles.dataActiveButton : commonStyles.dataInactiveButton}>
                                <Text style={!show ? commonStyles.activeText : commonStyles.inactiveText}>Environnement</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>



                {show ?
                    <View>
                        <Details product={product} />
                    </View>
                    : null}

                {!show ?
                    <DisplayTextInformations text={envText}/>
                    : null}

                <DisplayTextInformations title={"Comparateur de prix"} text={priceCompareText} />

                <View style={{ marginTop: 20 }}>
                    <Recommendations product={product} />
                </View>
            </ScrollView>
        </View>

    );
};

export default ProductCard;