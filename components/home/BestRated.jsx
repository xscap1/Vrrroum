import { useRouter } from "expo-router";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import PreviewCard from "../common/cards/previewCard/PreviewCard";
import commonStyles from "../../styles/common";
import SeeMoreButton from "../common/buttons/SeeMoreButton";
import { COLORS, SIZES } from "../../constants";
import React, { useEffect, useState } from 'react';

const BestRated = () => {
    const router = useRouter();
    const utils = require('../../constants/utils');
    const api = require('../../api/api');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        api.getBestRatedPreviewFromApi(setData, setLoading);
    }, []);

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Les mieux notés</Text>
            <View style={{ marginTop: 15 }}>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => (
                            <PreviewCard
                                product={item}
                                colorNote={utils.noteToColor(item.score)}
                            />
                        )}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>
            <SeeMoreButton handlePress={() => { router.push(`/home/bestRated`) }} />
        </View>
    );
};

export default BestRated;