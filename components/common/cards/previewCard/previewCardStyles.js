import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

import { Dimensions } from "react-native";
// import { ww } from "../../../../styles/common";

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.darkgray,
        paddingTop: 0.025 * ww,
        paddingBottom: 0.025 * ww,
        paddingLeft: 0.025 * ww,
        paddingRight: 0.025 * ww,
        borderRadius: 10,
        width: 0.5 * ww,
        height: 0.35 * wh
    },

    categoryWrap: {
        backgroundColor: COLORS.lightgray,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 8,
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

    scoreContainer: {
        borderRadius: 100, 
        width: 0.1 * ww, 
        height: 0.1 * ww, 
        justifyContent: 'center', 
        backgroundColor: COLORS.background, 
        borderWidth: 1, 
        borderStyle: 'solid',
    },
    
    scoreText : {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: SIZES.small,
        marginTop: 0,
        width: 0.1 * ww,
    },

    scanWrap: {
        backgroundColor: COLORS.background,
        borderColor: COLORS.lightgreen,
        borderWidth: 1,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 8,
        justifyContent: "center",
        alignSelf: "flex-start",
    },

    img: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    icon: {
        width: 15,
        height: 15,
        margin: 1
    },

    brandWrap: {
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
    },

    nameWrap: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
        width: '75%'
    },

    noteWrap: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
        width: '25%'
    },

    name: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
        alignSelf: 'center'
    },

    brand: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
        alignSelf: "flex-start",
    },

    category: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
        alignSelf: "flex-start",
    },

    scan: {
        fontSize: SIZES.medium,
        color: COLORS.lightgreen,
        alignSelf: "flex-start",
    },

    rate: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
    },

    categoryBrandWrapper: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: 'space-between',
        gap: 10
    },

    notationContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 5,
        alignItems: 'center',
        gap: 0.025 * ww
    }
});

export default styles;
