import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor : COLORS.darkgray,
        paddingTop: 0.05 * ww,
        paddingBottom: 0.05 * ww,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        borderRadius: 10,
        width: 0.7*ww,
        height: 0.42*wh
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
        width : '100%',
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

    categoryBrandWrapper : {
        flexDirection: "row",
        marginTop: 12,
        justifyContent:'space-between',
        gap: 10
    },

    flexchild: {
    }
});

export default styles;
