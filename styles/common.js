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
    },

    flexSafeArea: {
        backgroundColor: COLORS.background,
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
        paddingTop: 0.02 * ww,
        paddingBottom: 0.02 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
    },

    flexContainer: {
        paddingTop: 0.02 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        flex: 1
    },

    flexContainerWoPadding: {
        flex: 1
    },

    flexFullScreenContainer: {
        paddingTop: 0.02 * ww,
        paddingBottom: 0.02 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        width: '100%',
        height: '100%',
    },

    subcontainer: {
        backgroundColor: COLORS.darkgray,
        marginTop: 0.02 * ww,
        paddingTop: 0.02 * ww,
        paddingBottom: 0.02 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        borderRadius: 10
    },

    subContainerWithoutColor: {
        marginTop: 0.02 * ww,
        paddingTop: 0.02 * ww,
        paddingBottom: 0.02 * ww,
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
        color: COLORS.subwhite,
    },

    swipeWrapper: {
        backgroundColor: 'red',
        height: 'auto'
    },

    swipeView: {
    },

    swipeSubtext: {
        fontSize: SIZES.xMedium,
        color: COLORS.subwhite,
        paddingBottom: 3
    },

    activeSwipeSubtext: {
        fontSize: SIZES.xMedium,
        color: COLORS.yellow,
        fontWeight: 'bold',
        paddingBottom: 2
    },

    activeSwipeContainer: {
        borderBottomWidth: 2,
        borderColor: COLORS.yellow,
        padding: 10
    },

    swipeContainer: {
        borderBottomWidth: 2,
        padding: 10
    },

    subtextBold: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
        fontWeight: 'bold',
        lineHeight: 23
    },

    textCenter: {
        fontSize: SIZES.large,
        color: COLORS.subwhite,
        textAlign: 'center'
    },

    subtextCenter: {
        fontSize: SIZES.medium,
        color: COLORS.subwhite,
        textAlign: 'center'
    },

    smalltextCenter: {
        fontSize: SIZES.small,
        color: COLORS.subwhite,
        textAlign: 'center'
    },

    smallText: {
        fontSize: SIZES.small,
        color: COLORS.subwhite,
    },

    xsmallText: {
        fontSize: SIZES.xSmall,
        color: COLORS.subwhite,
    },

    smallTextBold: {
        fontSize: SIZES.small,
        color: 'white',
        fontWeight: 'bold'
    },

    subTextCenterBlack: {
        fontSize: SIZES.medium,
        color: 'black',
        textAlign: 'center'
    },

    subtextCenterWarning: {
        fontSize: SIZES.medium,
        color: 'orange',
        textAlign: 'center'
    },

    heading: {
        fontSize: SIZES.xLarge,
        color: COLORS.lightwhite,
        fontWeight: 'bold',
    },

    headingCenter: {
        fontSize: SIZES.xLarge,
        color: COLORS.lightwhite,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subHeading: {
        fontSize: SIZES.large,
        color: COLORS.lightwhite,
        fontWeight: 'bold',
    },

    subHeadingCenter: {
        fontSize: SIZES.large,
        color: COLORS.lightwhite,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    link: {
        color: COLORS.hyperlink,
    },

    linkCenter: {
        color: COLORS.hyperlink,
        textAlign: 'center'
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
        fontSize: 11,
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
    },

    input: {
        height: 40,
        borderRadius: 10,
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: COLORS.darkgray,
        color: COLORS.lightwhite
    },

    buttonGray: {
        width: 200,
        borderRadius: 10,
        padding: 10,
        color: COLORS.lightwhite,
        backgroundColor: COLORS.darkgray
    },

    buttonYellow: {
        width: 200,
        borderRadius: 10,
        padding: 10,
        color: 'black',
        backgroundColor: COLORS.yellow,
        alignItems: 'center'
    },

    buttonGrayCenter: {
        width: 200,
        borderRadius: 10,
        padding: 10,
        color: COLORS.lightwhite,
        backgroundColor: COLORS.darkgray,
        alignSelf: 'center'
    },

    buttonLightGray: {

    },

    buttonYellowCenter: {
        width: 200,
        borderRadius: 10,
        padding: 10,
        color: 'black',
        backgroundColor: COLORS.yellow,
        alignSelf: 'center'
    },

});

export default commonStyles;
