import { React, useEffect, useState } from "react";
import { View, Text } from "react-native";
import commonStyles from "../../../../styles/common";
import { COLORS, SIZES } from "../../../../constants";

const Notation = ({ total, note, env }) => {

    const utils = require('../../../../constants/utils');

    return (
        <View style={{ backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 10, marginTop: 20, width: '100%' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20, justifyContent: 'center', alignContent: 'center' }}>
                <View style={{width: 30, height: 30, backgroundColor: utils.noteToColor(note), borderRadius: 100,  justifyContent: 'center', alignSelf: 'center'}}>

                </View>
                <View>
                    <Text style={commonStyles.textBold}>{note}/10</Text>
                    <Text style={commonStyles.subtext}>{utils.noteToText(note)}</Text>
                </View>
            </View>
            {/* <View style={{ backgroundColor: COLORS.darkgray, padding: 5, borderRadius: 10, marginTop: 20, width: '100%', flexDirection: "row", padding: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center', padding: 10, justifyContent: 'center' }}>
                    <View style={{ gap: 20, alignItems: 'center'}}>
                        <View style={{
                            borderWidth: 2,
                            justifyContent: 'center',
                            borderStyle: 'solid',
                            borderRadius: 100,
                            borderColor: utils.noteToColor(note),
                            width: 90,
                            height: 90,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: utils.noteToColor(note),
                                textAlign: 'center',
                                fontWeight: '500',
                                fontSize: SIZES.xLarge,
                                marginTop: 0,
                                width: 90
                            }}>{note} / 10</Text>
                        </View>
                        <View style={{}}>
                            <Text style={commonStyles.text}> Note globale </Text>
                        </View>
                    </View>
                </View>
            </View> */}
        </View>
    );
};

export default Notation;