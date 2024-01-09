import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper : {
        backgroundColor : COLORS.darkgray,
        borderRadius: 10,
        width: 0.70*ww,
        height: 0.25*wh
    },

    image : {
        objectFit: 'contain'
    },
});

export default styles;