import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    footer: {
        backgroundColor: COLORS.darkgray,
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 0.05 * ww,
        paddingRight: 0.05 * ww,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    icon : {
        width: 30,
        height: 30,
    }
});

export default styles;