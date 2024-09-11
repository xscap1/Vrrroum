import { React } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../../constants";
import commonStyles from "../../../../styles/common";
import ProtectedRoute from "../../../sub/ProtectedRoute";

const Compare = ({ product }) => {

    const PriceComparisonBox = () => {
        return (
            <View style={{ backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 10, }}>
                <View style={{ flexDirection: 'row', height: 50 }}>
                    <View style={{ width: '15%', backgroundColor: 'red', borderRadius: 5 }}></View>
                    <View style={{ alignSelf: 'center', width: '42.5%', padding: 5 }}><Text style={commonStyles.smallText} numberOfLines={2}>{product.name}</Text></View>
                    <View style={{ flexDirection: 'row', width: '42.5%' }}>
                        <View style={{ alignSelf: 'center', width: '45%' }}><Text style={commonStyles.smallTextBoldCenter}>99,99$</Text></View>
                        <View style={{ alignSelf: 'center', width: '55%' }}>
                            <TouchableOpacity style={{ backgroundColor: COLORS.yellow, borderRadius: 5, padding: 5 }}>
                                <Text style={{ fontSize: SIZES.small, alignSelf: 'center', fontWeight: 'bold' }}>Voir l'offre</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <ProtectedRoute>
            <View style={{ marginTop: 20, width: '100%' }}>
                <View style={{ gap: 10 }}>
                    <PriceComparisonBox />
                    <PriceComparisonBox />
                    <PriceComparisonBox />
                    <PriceComparisonBox />
                </View>
            </View>
        </ProtectedRoute>
    );
}

export default Compare;