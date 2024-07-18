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
import Swiper from 'react-native-swiper';
import Notation from '../../products/notation/notation';
import Environnement from '../../products/environment/environment';

const ProductCard = ({ product, scan }) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;

    const [show, setShow] = useState(true);
    const [switchIcon, setSwitchIcon] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dynamicHeight, setDynamicHeight] = useState([100, 100, 100, 100]);
    const [height, setHeight] = useState(100);

    const priceCompareText = "Cette fonctionnalité sera bientôt disponible \! L\'équipe Vrrroum travaille dur pour vous offrir la solution d'achat en ligne la plus économique.";

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
            if (res)
                setSwitchIcon(true);
        }

        check();

    }, [switchIcon]);


    useEffect(() => {
        setHeight(dynamicHeight[activeIndex]);
    }, [activeIndex, dynamicHeight]);

    const onLayoutChange = (index, event) => {
        const { height } = event.nativeEvent.layout;
        setDynamicHeight(prevHeights => {
            const newHeights = [...prevHeights];
            newHeights[index] = height;
            return newHeights;
        });
    };

    return (
        <View style={commonStyles.flexContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={{}}>
                    {product ? (
                        <View>
                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: 15,
                                padding: 20,
                                position: 'relative'
                            }}>
                                <Image
                                    source={{
                                        uri: product.img == null ? product.imgUrl : product.img
                                    }}
                                    style={styles.img}
                                />
                                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, borderRadius: 10, padding: 5 }} onPress={async () => { const res = await addProductToFavorites(); if (res == 0) setSwitchIcon(true); }}>
                                    <Icon name={switchIcon ? 'favorite' : 'favorite-border'} type='material' color={'black'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={commonStyles.subtextBold}>{product.name}</Text>
                            </View>
                        </View>
                    ) : null}
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={activeIndex == 0 ? commonStyles.activeSwipeContainer : {}}><Text style={activeIndex == 0 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Note</Text></View>
                    <View style={activeIndex == 1 ? commonStyles.activeSwipeContainer : {}}><Text style={activeIndex == 1 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Environnement</Text></View>
                    <View style={activeIndex == 2 ? commonStyles.activeSwipeContainer : {}}><Text style={activeIndex == 2 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Comparateur</Text></View>
                    <View style={activeIndex == 3 ? commonStyles.activeSwipeContainer : {}}><Text style={activeIndex == 3 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Informations</Text></View>
                </View>


                <Swiper
                    activeDotColor="yellow" // Change this to COLORS.yellow if you have a COLORS object
                    onIndexChanged={(index) => {
                        setActiveIndex(index);
                    }}
                    loadMinimal={true}
                    showsPagination={false}
                    height={height}
                >
                    <View onLayout={(e) => onLayoutChange(0, e)}>
                        <Notation note={product.score}/>
                    </View>
                    <View onLayout={(e) => onLayoutChange(1, e)}>
                        <Environnement hazard={product.hazard} env={product.env}/>
                    </View>
                    <View onLayout={(e) => onLayoutChange(2, e)}>
                        <DisplayTextInformations text={priceCompareText} />
                    </View>
                    <View onLayout={(e) => onLayoutChange(3, e)}>
                        <Details product={product} />
                    </View>
                </Swiper>

                <View style={{ marginTop: 20 }}>
                    <Recommendations product={product} />
                </View>
            </ScrollView>
        </View>

    );
};

export default ProductCard;