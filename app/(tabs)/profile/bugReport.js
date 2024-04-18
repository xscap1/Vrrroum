import { SafeAreaView, View, Text, ActivityIndicator, Linking, StyleSheet, TextInput } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import commonStyles from "../../../styles/common";
import React from 'react';
import { useState, useEffect } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from "../../../constants";
import ScreenHeaderBtn from "../../../components/common/buttons/SeeMoreButton";
import DisplayTextInformations from "../../../components/common/cards/DisplayTextInformations";

const BugReport = () => {

    const data = [
        { label: 'Le scan ne fonctionne pas', value: '1', code: 'scan_error' },
        { label: 'Produit manquant', value: '2', code: 'missing_product' },
        { label: 'Problème pour se connecter', value: '3', code: 'login_error' },
        { label: 'Impossible d\'obtenir un abonnement', value: '4', code: 'subscribe_error' },
        { label: 'Une erreur ou manque d\'une information sur un produit', value: '5', code: 'missing_product_data' },
        { label: 'Autre problème', value: '6', code: 'other' },
    ];

    const [ddValue, setddValue] = useState(null);
    const [ddCode, setddCode] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [responseReport, setResponseReport] = useState(null);

    const [tiValue, setTiValue] = useState(null);

    const api = require('../../../api/api');

    const styles = StyleSheet.create({
        container: {
            borderRadius: 15,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: COLORS.darkgray,
            padding: 5,
            marginTop: 10
        },
        dropdown: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 15,
            paddingHorizontal: 8,
            backgroundColor: COLORS.darkgray
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: COLORS.background,
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
            color: COLORS.lightwhite,
            padding: 5
        },
        selectedTextStyle: {
            fontSize: 16,
            color: COLORS.lightwhite,
            padding: 5
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
        itemContainer: {
            backgroundColor: COLORS.darkgray,
        },

        itemText: {
            color: COLORS.lightwhite
        },

        textInputStyle: {
            height: '50%',
            width: 'auto',
            padding: 10,
            paddingTop: 10,
            backgroundColor: COLORS.darkgray,
            borderRadius: 15,
            color: COLORS.lightwhite,
            fontSize: 16,
            marginTop: 10
        }
    });

    const ReportBugToApi = async () => {
        const data = JSON.stringify([ddCode, tiValue]);
        return await api.PostReportBugToApi(data, setResponseReport);
    }

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
                    {responseReport != null && responseReport.reported ? <DisplayTextInformations text={"Votre problème a bien été rapporté auprès de notre équipe. Merci pour votre aide."} /> : <View>
                        <Text style={commonStyles.heading}>Rapporter un bug</Text>
                        <View style={{ marginTop: 20 }}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                itemContainerStyle={styles.itemContainer}
                                itemTextStyle={styles.itemText}
                                containerStyle={styles.container}
                                data={data}
                                maxHeight={300}
                                activeColor={COLORS.background}
                                labelField="label"
                                valueField="value"
                                placeholder={'Sélectionnez un bug'}
                                value={ddValue}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setddValue(item.value);
                                    setddCode(item.code);
                                    setIsFocus(false);
                                }}
                            />
                            <View>
                                <TextInput style={styles.textInputStyle} value={tiValue} onChangeText={setTiValue} placeholder="Décrivez le problème rencontré" multiline
                                    numberOfLines={4} maxLength={80} />
                            </View>
                            <ScreenHeaderBtn text={"Envoyer"} disabled={ddCode != null && (tiValue != null && tiValue.length > 10) ? false : true} handlePress={async () => {
                                await ReportBugToApi();
                            }} />
                        </View>
                    </View>}


                </View>
            </SafeAreaView>
        </View>
    );
};

export default BugReport;