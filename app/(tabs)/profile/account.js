import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import React, { useEffect, useState } from 'react';
import AccountEditor from "../../../components/profile/account/accountEditor";

const Account = () => {
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
                <View style={commonStyles.flexContainer}>
                    <Text style={commonStyles.heading}>Gérer mon compte</Text>
                    <AccountEditor/>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Account;