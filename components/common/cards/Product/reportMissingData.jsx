import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import commonStyles from "../../../../styles/common";
import ScreenHeaderBtn from '../../buttons/SeeMoreButton';
import { COLORS } from '../../../../constants';
import DisplayTextInformations from '../DisplayTextInformations';

const ReportMissingData = (code) => {

    const formattedCode = code.code;
    const [brand, setBrand] = useState(null);
    const [ref, setRef] = useState(null);
    const [name, setName] = useState(null);
    const [response, setResponse] = useState(null);

    const api = require('../../../../api/api');

    const validReport = "Merci pour votre aide ! Vos renseignements ont directement été envoyés à notre équipe."

    const styles = StyleSheet.create({
        textInputStyle: {
            height: 50,
            width: 'auto',
            padding: 10,
            paddingTop: 10,
            backgroundColor: COLORS.darkgray,
            borderRadius: 10,
            color: COLORS.lightwhite,
            fontSize: 16,
            marginTop: 10,
        }
    });

    const reportMissingProduct = async () => {
        await api.PostReportMissingProductToApi(JSON.stringify([{ id: formattedCode, brand: brand, name: name, reference: ref == null ? "" : ref }]), setResponse);
    }

    return (
        <View style={{}}>
            {response != null ? <DisplayTextInformations text={validReport}/> : <View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={commonStyles.textBold}>Marque</Text>
                    <TextInput style={styles.textInputStyle} value={brand} onChangeText={setBrand} placeholder="Marque du produit" maxLength={50} placeholderTextColor={COLORS.lightgray}/>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={commonStyles.textBold}>Nom</Text>
                    <TextInput style={styles.textInputStyle} value={name} onChangeText={setName} placeholder="Nom du produit" maxLength={50} placeholderTextColor={COLORS.lightgray}/>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={commonStyles.textBold}>Référence</Text>
                    <TextInput style={styles.textInputStyle} value={ref} onChangeText={setRef} placeholder="Référence si possible" maxLength={50} placeholderTextColor={COLORS.lightgray}/>
                </View>
                <ScreenHeaderBtn text={"Envoyer"} disabled={brand != "" && name != "" ? false : true} handlePress={async () => { await reportMissingProduct(); }} />
            </View>}
        </View>
    );
}

export default ReportMissingData;