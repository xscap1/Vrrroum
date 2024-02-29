import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList } from "react-native";
import ListedProductCard from "../common/cards/listedProduct/ListedProductCard";
import { COLORS, SIZES } from "../../constants"

const ListedProducts = ({ products, scan, onEndOnPress, flatlist = true }) => {
    const router = useRouter();

    const utils = require('../../constants/utils');

    return (
        <View style={{ flex: 1 }}>
            {products ? (
                <View style={{ marginTop: 15, flex: 1 }}>
                    {flatlist ?
                        <FlatList
                            style={{ flex: 1 }}
                            data={products}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <ListedProductCard
                                    product={item}
                                    colorNote={utils.noteToColor(item.score)}
                                    scan={scan}
                                />
                            )}
                            contentContainerStyle={{ columnGap: SIZES.medium }}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => { if (onEndOnPress != null) onEndOnPress(); }}
                            onEndReachedThreshold={0.2}
                        /> :
                        products.map(function (item, i) {
                            return <ListedProductCard
                                key={i}
                                product={item}
                                colorNote={utils.noteToColor(item.score)}
                                scan={scan}
                            />
                        })}
                </View>) : null}
        </View>
    );
};

export default ListedProducts;