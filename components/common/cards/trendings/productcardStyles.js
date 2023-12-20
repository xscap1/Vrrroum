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
        height: 0.4*wh
    },

    categoryWrap: {
        backgroundColor: COLORS.lightgray,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
    },
    
    img: {
        borderRadius: 10,
        width : '100%',
        height: '90%'
    },

    brandWrap: {
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
    },

    name: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
    },
    
    brand: {
        fontSize: SIZES.small,
        color: COLORS.lightwhite,
        alignSelf: "flex-start",
    },

    rate: {
        fontSize: SIZES.medium,
        color: COLORS.lightwhite,
    },

    categoryBrandWrapper : {
        flexDirection: "row",
        justifyContent: "center"
    },

    flexchild: {
    }
});

export default styles;
