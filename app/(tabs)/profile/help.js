import { SafeAreaView, View, Text, ActivityIndicator, Linking } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import commonStyles from "../../../styles/common";
import React from 'react';
import { useState, useEffect } from "react";
import ListedButton from "../../../components/common/buttons/ListedButton";
import { useNavigation } from "expo-router";
import { icons } from "../../../constants";

const Help = () => {

    const navigation = useNavigation();

    return (
        <View style={commonStyles.body}>
            <SafeAreaView style={commonStyles.flexSafeArea}>
                <Stack.Screen
                    options={{
                        headerStyle: commonStyles.header,
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerBackTitleVisible: false
                    }}
                />
                <View style={commonStyles.flexContainer}>
                    <Text style={commonStyles.heading}>Aide</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={commonStyles.subHeading}>Bug rencontrés</Text>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyContent: 'space-between', gap: 15, marginTop: 20 }}>
                            <ListedButton text={'Rapporter un bug'} icon={icons.bug} handlePress={() => { navigation.push('bugReport'); }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={commonStyles.subHeading}>À propos de Vrrroum</Text>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyContent: 'space-between', gap: 15, marginTop: 20 }}>
                            <ListedButton text={'Nous contacter'} icon={icons.help} handlePress={() => { Linking.openURL('https://www.vrrroum.com/contact') }} />
                            <ListedButton text={'Qui sommes-nous ?'} icon={icons.info} handlePress={() => { Linking.openURL('https://www.vrrroum.com') }} />
                            <ListedButton text={'Conditions d\'utilisation'} icon={icons.terms} handlePress={() => { Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/') }} />
                            <ListedButton text={'Politique de confidentialité'} icon={icons.privacy} handlePress={() => { Linking.openURL('https://www.vrrroum.com/politique-de-confidentialite') }} />
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </View>
    );
};

export default Help;