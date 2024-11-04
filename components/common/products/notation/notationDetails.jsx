import { React, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import commonStyles from "../../../../styles/common";
import { COLORS, SIZES, icons } from "../../../../constants";

const NotationDetails = ({ criteria, effectiveness, durability }) => {

    const utils = require('../../../../constants/utils');

    const Details = ({ name, note }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 10, alignItems: 'center' }}>
                <View style={{ width: '75%' }}>
                    <Text style={commonStyles.subtextBold}>{utils.criteriaToText(name)}</Text>
                </View>
                <View style={{ width: '25%', flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <View style={{ width: 20, height: 20, backgroundColor: utils.noteToColor(note), borderRadius: 100, justifyContent: 'center', alignSelf: 'center' }}>
                    </View>
                    <Text style={commonStyles.smallTextBold}>{note}/10</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={{ marginTop: 20, flex: 1, paddingBottom: 5 }}>
            <ScrollView style={{ height: '100%', flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <Text style={commonStyles.subHeading}>Efficacité</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <Text style={commonStyles.subHeading}>Longévité</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15}}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20, justifyContent: 'center', alignContent: 'center', marginBottom: 10, width: '50%'}}>
                        <View style={{ width: 30, height: 30, backgroundColor: utils.noteToColor(effectiveness), borderRadius: 100, justifyContent: 'center', alignSelf: 'center' }}>

                        </View>
                        <View>
                            <Text style={commonStyles.textBold}>{effectiveness}/10</Text>
                            <Text style={commonStyles.subtext}>{utils.noteToText(effectiveness)}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20, justifyContent: 'center', alignContent: 'center', marginBottom: 10, width: '50%'}}>
                        <View style={{ width: 30, height: 30, backgroundColor: utils.noteToColor(durability), borderRadius: 100, justifyContent: 'center', alignSelf: 'center' }}>

                        </View>
                        <View>
                            <Text style={commonStyles.textBold}>{durability}/10</Text>
                            <Text style={commonStyles.subtext}>{utils.noteToText(durability)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ gap: 20 }}>
                    {Object.keys(criteria).map((c, index) => (
                        <Details key={index} name={c} note={criteria[c]} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

export default NotationDetails;