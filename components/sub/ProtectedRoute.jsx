import React, { useEffect, useContext } from 'react';
import { Stack } from "expo-router";
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import SubscriptionContext from './SubscriptionContext';
import { useNavigation } from 'expo-router';
import commonStyles from '../../styles/common';
import { COLORS } from '../../constants';

const ProtectedRoute = ({ children }) => {
    const { subscription, updateSubscription } = useContext(SubscriptionContext);
    const navigation = useNavigation();
    const missingSubscription = "Accès abonnés"
    const missingSubscriptionTitle = "Recherchez, comparez et économisez.";
    const missingSubscriptionText = "Vrrroum référence plus de 500 produits. Profitez des services de l'abonnement Vrrroum.";

    useEffect(() => {
        const updateSubscriptionStatus = async () => {
            await updateSubscription();
        };

        updateSubscriptionStatus();

    }, [])

    if (!subscription) {
        return (
            <View style={commonStyles.body}>
                <SafeAreaView style={commonStyles.flexSafeArea}>
                    <Stack.Screen
                        options={{
                            headerStyle: commonStyles.header,
                            headerShadowVisible: false,
                            headerTitle: "",
                        }}
                    />
                    <View style={commonStyles.container}>
                        <View style={commonStyles.subcontainer}>
                            <View style={{ marginTop: 0, marginBottom: 20, padding: 10, gap: 10 }}>
                                <Text style={{ color: COLORS.yellow, justifyContent: 'center', alignSelf: 'center' }}>{missingSubscription}</Text>
                                <Text style={commonStyles.subHeadingCenter}>{missingSubscriptionTitle}</Text>
                                <Text style={{ color: COLORS.subwhite, alignSelf: 'center', textAlign: 'center' }}>{missingSubscriptionText}</Text>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <TouchableOpacity style={commonStyles.buttonYellowCenter} onPress={() => { 
                                    navigation.navigate('(tabs)', {screen: 'profile', params: {screen: 'pricing', initial: false}});
                                    }}>
                                    <Text style={{ alignSelf: 'center' }}>S'abonner à Vrrroum</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return children;

}

export default ProtectedRoute;