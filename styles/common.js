import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const commonStyles = StyleSheet.create({
    body: {
        backgroundColor: COLORS.darkgray,
        width: '100%',
        height: '100%',
        flex: 1
    },

    safeArea: {
        backgroundColor: COLORS.background
    },

    flexSafeArea: {
        backgroundColor: COLORS.background,
        flex: 1
    },

    header: {
        backgroundColor: COLORS.background,
    },

    container: {
        paddingTop: 0.05 * ww,
        paddingBottom: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
    },

    flexContainer: {
        paddingTop: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        flex: 1
    },

    subcontainer: {
        backgroundColor: COLORS.darkgray,
        marginTop: 0.05 * ww,
        paddingTop: 0.05 * ww,
        paddingBottom: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        borderRadius: 10
    },

    categoryContainer: {
        backgroundColor: COLORS.darkgray,
        marginBottom: 0.05 * ww,
        paddingTop: 0.05 * ww,
        paddingBottom: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        borderRadius: 10
    },

    text: {
        fontSize: SIZES.large,
        color: COLORS.lightwhite
    },

    textBold: {
        fontSize: SIZES.large,
        color: COLORS.lightwhite,
        fontWeight: 'bold'
    },

    subtext: {
        fontsize: SIZES.medium,
        color: COLORS.subwhite
    },

    heading: {
        fontSize: SIZES.xLarge,
        color: COLORS.lightwhite,
        fontWeight: 'bold',
    },

    tabBar: {
        backgroundColor: COLORS.darkgray,
        borderBlockColor: COLORS.darkgray
    },

    noteText: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: SIZES.medium,
        marginTop: 0,
        width: 40,
        color: COLORS.lightwhite
    },

    categoryWrap: {
        backgroundColor: COLORS.lightgray,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
    },

    category: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
        alignSelf: "flex-start",
    },
});

export default commonStyles;