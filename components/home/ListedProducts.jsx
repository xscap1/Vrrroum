import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList } from "react-native";
import ListedProductCard from "../common/cards/listedProduct/ListedProductCard";
import { COLORS, SIZES } from "../../constants";

const ListedProducts = ({ products, scan, onEndOnPress, flatlist = true }) => {
    const router = useRouter();

    const utils = require('../../constants/utils');

    const adCpt = 6;

    const renderItem = ({ item, index }) => (
        <View key={index}>
            <ListedProductCard
                product={item}
                colorNote={utils.noteToColor(item.score)}
                scan={scan}
            />
            {(index + 1) % adCpt === 0 && (
                <View style={{ backgroundColor: 'blue', height: 100, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>PUBLICITE</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {products ? (
                <View style={{ marginTop: 15, flex: 1 }}>
                    {flatlist ?
                        <FlatList
                            style={{ flex: 1 }}
                            data={products}
                            keyExtractor={({ id }) => id}
                            renderItem={renderItem}
                            contentContainerStyle={{ columnGap: SIZES.medium, gap: 5 }}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => { if (onEndOnPress != null) onEndOnPress(); }}
                            onEndReachedThreshold={0.2}
                        /> :
                        products.map((item, i) => (
                            <View key={i}>
                                <ListedProductCard
                                    product={item}
                                    colorNote={utils.noteToColor(item.score)}
                                    scan={scan}
                                />
                                {(i + 1) % adCpt === 0 && (
                                    <View style={{ backgroundColor: 'blue', height: 100, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white' }}>COUCOU</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                </View>) : null}
        </View>
    );
};

export default ListedProducts;