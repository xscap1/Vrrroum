import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const commonStyles = StyleSheet.create({
    body: {
        backgroundColor : COLORS.darkgray,
        width: '100%',
        height: '100%',
        flex: 1
    },

    safeArea: {
        backgroundColor: COLORS.background
    },

    header: {
        backgroundColor : COLORS.background,
    },

    container: {
        paddingTop: 0.05 * ww,
        paddingBottom: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
    },

    subcontainer: {
        backgroundColor : COLORS.darkgray,
        marginTop: 0.05 * ww,
        paddingTop: 0.05 * ww,
        paddingBottom: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        borderRadius: 10
    },

    text: {
        fontSize : SIZES.large,
        color: COLORS.lightwhite
    },

    textBold: {
        fontSize : SIZES.large,
        color: COLORS.lightwhite,
        fontWeight: 'bold'
    },

    subtext : {
        fontsize : SIZES.medium,
        color : COLORS.subwhite
    },

    heading: {
        fontSize : SIZES.xLarge,
        color: COLORS.lightwhite,
        fontWeight: 'bold'
    }
});

export default commonStyles;