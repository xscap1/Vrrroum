import { StyleSheet, Platform, StatusBar } from "react-native";
import { COLORS, SIZES } from "../constants";

import { Dimensions } from "react-native";

export const ww = Dimensions.get('window').width;
export const wh = Dimensions.get('window').height;

const commonStyles = StyleSheet.create({
    body: {
        backgroundColor: COLORS.darkgray,
        width: '100%',
        height: '100%',
        flex: 1
    },

    safeArea: {
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    flexSafeArea: {
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1
    },

    androidFlexSafeArea: {
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

    flexContainerWoPadding: {
        flex: 1
    },

    flexFullScreenContainer : {
        paddingTop: 0.05 * ww,
        paddingBottom: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        width: '100%',
        height: '100%',
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
        fontSize: SIZES.medium,
        color: COLORS.subwhite
    },

    subtextCenter: {
        fontSize: SIZES.medium,
        color: COLORS.subwhite,
        textAlign: 'center'
    },

    heading: {
        fontSize: SIZES.xLarge,
        color: COLORS.lightwhite,
        fontWeight: 'bold',
    },

    subHeading : {
        fontSize: SIZES.large,
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

    scanContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.background,
        borderColor: COLORS.lightgreen,
        borderWidth: 1,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 8,
        justifyContent: "center",
    },

    scan: {
        fontSize: SIZES.medium,
        color: COLORS.lightgreen,
        alignSelf: "flex-start",
    },

    dataActiveButton: {
        borderColor: COLORS.yellow,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        width: '100%',
        padding: 5,
        alignItems: 'center'
    },

    dataInactiveButton: {
        borderColor: COLORS.lightwhite,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        width: '100%',
        padding: 5,
        alignItems: 'center'
    },

    activeText: {
        fontSize: SIZES.medium,
        color: COLORS.yellow,
    },

    inactiveText: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite
    }
});

export default commonStyles;
