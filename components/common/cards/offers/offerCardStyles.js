import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper : {
        borderRadius: 10,
        width: 0.78*ww,
        height: 0.19*wh
    },

    image : {
        borderRadius: 10,
        flex: 1, 
        // height: undefined, 
        width: undefined
    },
});

export default styles;