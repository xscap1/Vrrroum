import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

import { Dimensions } from "react-native";

ww = Dimensions.get('window').width;
wh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        flexDirection : "row",
        height: 0.12*wh,
    },

    wrapperSponso : {
        flex: 1,
        flexDirection : "row",
        height: 0.15*wh,
    },

    imgContiner: {
        width: '20%',
        // backgroundColor: 'red'
    },

    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },

    datasContainer: {
        width: '80%',
        // backgroundColor: 'blue',
        marginLeft: 10
    },

    nameContainer: {
        marginLeft: 0.05*ww,
        alignSelf: 'center'
    },

    branded: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.lightwhite
    },

    name: {
        fontSize: SIZES.medium,
        color: COLORS.subwhite,
        marginTop: 5
    },

    sponsoContainer: {
        // backgroundColor: COLORS.lightgray,
        borderRadius: 100,
        alignSelf: 'flex-start',
        // padding: 1,
        marginBottom: 5
    },

    sponso: {
        fontSize: SIZES.small,
        color: COLORS.subwhite
    },

    noteContainer: {
        alignItems: 'flex-end',
        paddingRight: 10,
        marginTop: 15
    },

});

export default styles;