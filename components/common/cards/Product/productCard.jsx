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

    const renderContent = () => {
        switch (activeIndex) {
            case 0:
                return <Notation note={product.score.toFixed(1)} criteria={product.criteria} effectiveness={product.effectiveness} durability={product.durability} key={0} />;
            case 1:
                return <Environnement hazard={product.hazard} env={product.env} key={1} />;
            case 2:
                return <DisplayTextInformations text={priceCompareText} key={2} />;
            case 3:
                return <Details product={product} key={3} />;
            default:
                return null;
        }
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
                                <Text style={commonStyles.textBold}>{product.name ? product.name : product.title}</Text>
                            </View>
                        </View>
                    ) : null}
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <TouchableOpacity onPress={() => setActiveIndex(0)} style={activeIndex == 0 ? commonStyles.activeSwipeContainer : commonStyles.swipeContainer}>
                            <Text style={activeIndex == 0 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Note</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveIndex(1)} style={activeIndex == 1 ? commonStyles.activeSwipeContainer : commonStyles.swipeContainer}>
                            <Text style={activeIndex == 1 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Environnement</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveIndex(2)} style={activeIndex == 2 ? commonStyles.activeSwipeContainer : commonStyles.swipeContainer}>
                            <Text style={activeIndex == 2 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Comparateur</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveIndex(3)} style={activeIndex == 3 ? commonStyles.activeSwipeContainer : commonStyles.swipeContainer}>
                            <Text style={activeIndex == 3 ? commonStyles.activeSwipeSubtext : commonStyles.swipeSubtext}>Info</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        {renderContent()}
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Recommendations product={product} />
                </View>
            </ScrollView>
        </View>

    );
};

export default ProductCard;