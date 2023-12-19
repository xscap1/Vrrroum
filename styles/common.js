import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

import { Dimensions } from 'react-native'

const windowsWidth = Dimensions.get('window').width
const windowsHeight = Dimensions.get('window').height


const commonStyles = StyleSheet.create({
    body: {
        backgroundColor : COLORS.background,
        width: '100%',
        height: '100%'
    },

    header: {
        backgroundColor : COLORS.background
    },

    container: {
        paddingTop: 0.05 * windowsWidth,
        paddingBottom: 0.05 * windowsWidth,
        paddingLeft: 0.05 * windowsWidth,
        paddingRight: 0.05 * windowsWidth,
    },

    text: {
        fontSize : SIZES.large,
        color: COLORS.lightwhite
    },

    subtext : {
        fontsize : SIZES.medium,
        color : COLORS.subwhite
    },

    heading: {
        fontSize : SIZES.xLarge,
        color: COLORS.lightwhite
    }
});

export default commonStyles;