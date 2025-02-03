import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { View, FlatList } from "react-native";
import OfferCard from "../common/cards/offers/OfferCard";
import commonStyles from "../../styles/common";
import { COLORS, SIZES, images } from "../../constants";

const Offers = () => {
    const router = useRouter();
    const data = [images.offer1, images.offer2, images.offer3];
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [data.length]);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
        }
    }, [currentIndex]);

    return (
        <View style={commonStyles.container}>
            <View>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={({ item }) => (
                        <OfferCard image={item} />
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.xSmall }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default Offers;