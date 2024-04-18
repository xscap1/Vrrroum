import { SafeAreaView, View, Text, ActivityIndicator, Linking } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import commonStyles from "../../../styles/common";
import React from 'react';
import { useState, useEffect } from "react";
import ListedButton from "../../../components/common/buttons/ListedButton";
import { useNavigation } from "expo-router";

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
                            <ListedButton text={'Rapporter un problème sur l\'application'} handlePress={() => {navigation.push('bugReport');}}/>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={commonStyles.subHeading}>À propos de Vrrroum</Text>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyContent: 'space-between', gap: 15, marginTop: 20 }}>
                            <ListedButton text={'Qui sommes-nous ?'} handlePress={() => {Linking.openURL('https://vrrroum.webflow.io')}}/>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </View>
    );
};

export default Help;