import React, {useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import ListedProductCard from "../../common/cards/listedProduct/ListedProductCard";
import { COLORS, SIZES } from "../../../constants";
import { Icon } from "@rneui/themed";
import commonStyles from "../../../styles/common";
import { removeFavoriteByIdInCache } from "../../../utils";

const Favorites = ({ products, scan, onEndOnPress, onEmptyFavorites, flatlist = true }) => {
    const router = useRouter();

    const utils = require('../../../constants/utils');

    const [data, setData] = useState(products);

    async function handleRemove (id) {
        console.log(id);
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);
        const size = await removeFavoriteByIdInCache(id);
        if (size == 0) {
            onEmptyFavorites();
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {products ? (
                <View style={{ marginTop: 15, flex: 1 }}>
                    {flatlist ?
                        <FlatList
                            style={{ flex: 1 }}
                            data={data}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                    <View style={{ width: '85%' }}>
                                        <ListedProductCard
                                            product={item}
                                            colorNote={utils.noteToColor(item.score)}
                                            scan={scan}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => { handleRemove(item.id); }}>
                                        <Icon name="delete" color={COLORS.yellow} size={25} />
                                    </TouchableOpacity>
                                </View>

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

export default Favorites;