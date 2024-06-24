import { React, useState } from "react";
import { View, Text } from "react-native";
import commonStyles from "../../../../styles/common";
import { COLORS, SIZES } from "../../../../constants";

const Notation = ({ note, colorNote }) => {

    return (
        <View style={{}}>
            <View style={{ backgroundColor: COLORS.darkgray, padding: 5, borderRadius: 10, marginTop: 20, width: '100%', flexDirection: "row", padding: 10 }}>
                <View style={{ width: '50%', alignItems: 'center', padding: 10, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', gap: 20 }}>
                        <View style={{
                            borderWidth: 2,
                            justifyContent: 'center',
                            borderStyle: 'solid',
                            borderRadius: 100,
                            borderColor: colorNote,
                            width: 90,
                            height: 90,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: colorNote, textAlign: 'center',
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
                <View style={{ width: '50%', alignItems: 'flex-start', paddingTop: 10, paddingBottom: 10, paddingRight: 10, gap: 20, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: '', gap: 5 }}>
                        <View style={{
                            borderWidth: 2,
                            justifyContent: 'center',
                            borderStyle: 'solid',
                            borderRadius: 100,
                            borderColor: colorNote,
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: colorNote, textAlign: 'center',
                                fontWeight: '500',
                                fontSize: SIZES.medium,
                                width: 40
                            }}>{note}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={commonStyles.subtext}> Efficacité </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: '', gap: 5 }}>
                        <View style={{
                            borderWidth: 2,
                            justifyContent: 'center',
                            borderStyle: 'solid',
                            borderRadius: 100,
                            borderColor: colorNote,
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: colorNote, textAlign: 'center',
                                fontWeight: '500',
                                fontSize: SIZES.medium,
                                width: 40
                            }}>{note}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={commonStyles.subtext}> Environnement </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Notation;