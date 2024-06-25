import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import commonStyles from "../../styles/common";
import { COLORS, SIZES, images } from "../../constants"
import { Icon } from "@rneui/base";
import ListedButton from "../common/buttons/ListedButton";
import ScreenHeaderBtn from "../common/buttons/SeeMoreButton";
import { useNavigation } from "expo-router";
const ProfileData = ({logged}) => {

    const navigation = useNavigation();

    return (
        <View style={commonStyles.flexContainer}>
            <ScreenHeaderBtn text={'S\'abonner à Vrrroum'} handlePress={() => {navigation.push('pricing');}}/>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyContent: 'space-between', gap: 15, marginTop: 50 }}>
                {/* <ListedButton disabled={!logged} text={'Gérer mon abonnement'} handlePress={() => {navigation.push('subscriptionManager');}}/> */}
                <ListedButton text={'Favoris'} handlePress={() => {navigation.push('favs');}}/>
                <ListedButton text={'Historique de scans'} handlePress={() => {navigation.push('history');}}/>
                <ListedButton disabled={false} text={'Aide'} handlePress={() => {navigation.push('help');}}/>
            </View>
        </View>
    );
};

export default ProfileData;