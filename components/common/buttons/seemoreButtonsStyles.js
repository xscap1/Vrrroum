import { StyleSheet } from "react-native-web";
import {COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: COLORS.yellow,
        display: 'inline-block',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    disabledButton: {
        marginTop: 20,
        backgroundColor: COLORS.darkgray,
        display: 'inline-block',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    text : {
        color: 'black',
    },

    disabledText : {
        color: 'gray',
    }
});

export default styles;