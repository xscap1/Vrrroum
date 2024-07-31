import { React, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import { COLORS, SIZES } from "../../../../constants";

const Ingredient = ({ category, ingredients }) => {

    const [visible, setVisible] = useState(true);

    const utils = require('../../../../constants/utils');

    return (
        <View style={{ backgroundColor: COLORS.darkgray, marginBottom: 20, padding: 10, gap: 10, borderRadius: 10 }}>
            <TouchableOpacity
                onPress={() => { setVisible(!visible); }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={commonStyles.subtextBold}>{category}</Text>
                    <Text style={commonStyles.subtext}>{'>'}</Text>
                </View>
                {visible ? (
                    <View style={{ gap: 10, marginTop: 10 }}>
                        {ingredients.map((item, index) => (
                            <View key={index} style={{ gap: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{width: '80%'}}>
                                        <Text numberOfLines={1} style={commonStyles.smallTextBold}>{item.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <View style={{ width: 10, height: 10, backgroundColor: utils.noteToColor(item.score * 2), borderRadius: 100, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                        </View>
                                        <Text style={commonStyles.smallTextBold}>{item.score}/5</Text>
                                    </View>
                                </View>
                                <Text style={commonStyles.smallText}>{item.summary}</Text>
                            </View>
                        ))}
                    </View>
                ) : null}
            </TouchableOpacity>
        </View>
    );
}

export default Ingredient;