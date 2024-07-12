import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import commonStyles from "../../styles/common";
import { COLORS, SIZES, images, icons } from "../../constants"
import { Icon } from "@rneui/base";
import ListedButton from "../common/buttons/ListedButton";
import ScreenHeaderBtn from "../common/buttons/SeeMoreButton";
import { useNavigation } from "expo-router";
import AuthContext from "../auth/AuthContext";
import SubscriptionContext from "../sub/SubcriptionContext";

const ProfileData = ({ logged }) => {

    const navigation = useNavigation();
    const { user, loading, handleLogOut } = useContext(AuthContext);
    const { subscription } = useContext(SubscriptionContext);

    const handleLogInOnPress = () => {
        if (user)
            handleLogOut();
        else
            navigation.navigate('login');
    }

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyContent: 'space-between', gap: 15, marginTop: 50 }}>
                {/* <ListedButton disabled={!logged} text={'Gérer mon abonnement'} handlePress={() => {navigation.push('subscriptionManager');}}/> */}
                <ListedButton text={'Mon coffre'} icon={icons.hatch} handlePress={() => { navigation.push('favs'); }} />
                <ListedButton text={'Historique de scans'} icon={icons.search} handlePress={() => { navigation.push('history'); }} />
                <ListedButton text={'Aide'} icon={icons.help} handlePress={() => { navigation.push('help'); }} />
                <ListedButton text={'S\'abonner à Vrrroum'} icon={icons.unlock} handlePress={() => { navigation.push('pricing'); }} />

                {user ?
                    <ListedButton text={'Gérer mon compte'} icon={icons.edit_account} handlePress={() => { }} />
                    : null}

                {subscription ?
                    <ListedButton text={'Gérer mon abonnement'} icon={icons.edit_sub} handlePress={() => { navigation.push('subscriptionManager'); }} />
                    : null}

                <ListedButton text={user ? 'Déconnexion' : 'Connexion'} icon={user ? icons.logout : icons.login} handlePress={() => { handleLogInOnPress(); }} />

            </View>
        </View>
    );
};

export default ProfileData;