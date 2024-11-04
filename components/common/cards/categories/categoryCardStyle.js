import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper : {
        flexDirection : "row",
        height: 0.04*wh,
    },

    icon : {
        height: '150%',
        width: 0.12*ww,
        alignSelf: 'center'
    },

    nameContainer : {
        marginLeft: 0.05*ww,
        alignSelf: 'center',
        gap: 5
    }
});

export default styles;