import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import commonStyles from "../../../styles/common";
import { COLORS, SIZES } from "../../../constants";
import { Link } from "expo-router";
import ScreenHeaderBtn from "../buttons/SeeMoreButton";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";

const NoAccess = () => {

    const router = useRouter();

    return (
        <View style={{marginBottom: 20 }}>
            <View style={commonStyles.subcontainer}>
                <Text style={{ color: COLORS.subwhite, alignSelf: 'center', textAlign: 'center' }}>Fonctionnalité uniquement disponible pour les membres Vrrroum.</Text>
                <ScreenHeaderBtn text={'S\'abonner à Vrrroum'} handlePress={() => {router.push('profile/pricing'); }}/>
            </View>
        </View>
    );
};

export default NoAccess;