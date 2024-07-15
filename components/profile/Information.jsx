import React from "react";
import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Information = ({ label, text, border }) => {
    return (
        <View style={{ padding: 5 }}>
            {border ? <View style={{ width: '100%', height: 1, backgroundColor: COLORS.lightwhite }}></View> : null}
            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, padding: 5 }}>
                <View style={{ width: '40%', padding: 5 }}><Text style={{ color: COLORS.lightwhite, fontSize: SIZES.medium }}>{label}</Text></View>
                <View style={{ width: '60%', padding: 5 }}><Text style={{ color: COLORS.subwhite, fontSize: SIZES.medium, alignSelf: 'flex-end' }}>{text}</Text></View>
            </View>
        </View>
    );
}

export default Information;