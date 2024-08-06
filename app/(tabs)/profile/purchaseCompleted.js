import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { Stack } from "expo-router";
import commonStyles from '../../../styles/common';
import { COLORS, SIZES, images } from '../../../constants';
import { useNavigation } from 'expo-router';

const purchaseCompleted = () => {

    const navigation = useNavigation();

    return (
        <View style={commonStyles.body}>
            <SafeAreaView style={commonStyles.flexSafeArea}>
                <Stack.Screen
                    options={{
                        animation: 'slide_from_bottom',
                        headerStyle: commonStyles.header,
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerBackVisible: false
                    }}
                />
                <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: '100%', height: '100%', padding: 10, gap: 5 }}>
                    <Image source={images.logo} style={{ width: 150, height: 150, justifyContent: 'center', alignSelf: 'center' }} />
                    <Text style={commonStyles.headingCenter}>Bienvenue au Club !</Text>
                    <Text style={commonStyles.textCenter}>Vrrroum vous remercie pour cet achat</Text>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={commonStyles.subtextCenter}>

                            Vous faites maintenant partie de la communauté Vrrroum, un groupe de passionnés en quête de perfection. Les membres de ce club recherchent l'excellence dans l'art de l'entretien automobile. Grâce à votre engagement, Vrrroum, votre assistant automobile, continuera à vous proposer une gamme plus étendue de produits et à vous recommander des solutions plus efficaces tout en vous permettant de réaliser des économies.
                        </Text>
                    </View>
                    <TouchableOpacity style={commonStyles.buttonYellowCenter} onPress={() => {navigation.replace('subscriptionManager');}}>
                        <Text style={commonStyles.subTextCenterBlack}>Prendre la route</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default purchaseCompleted;