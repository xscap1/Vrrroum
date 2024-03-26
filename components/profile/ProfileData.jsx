import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import commonStyles from "../../styles/common";
import { COLORS, SIZES, images } from "../../constants"
import { Icon } from "@rneui/base";
import ListedButton from "../common/buttons/ListedButton";
import ScreenHeaderBtn from "../common/buttons/SeeMoreButton";

const ProfileData = ({logged}) => {

    return (
        <View style={commonStyles.flexContainer}>
            <ScreenHeaderBtn text={'S\'abonner à Vrrroum'}/>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyContent: 'space-between', gap: 15, marginTop: 50 }}>
                <ListedButton disabled={!logged} text={'Favoris'}/>
                <ListedButton disabled={!logged} text={'Historique de scans'}/>
            </View>
        </View>
    );
};

export default ProfileData;