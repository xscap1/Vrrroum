import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import styles from "./seemoreButtonsStyles";
import { COLORS, SIZES, icons } from "../../../constants";
import { StyleSheet } from "react-native";
import commonStyles from "../../../styles/common";
import { Dimensions } from "react-native";

const ListedButton = ({ text, handlePress, disabled, icon }) => {

    ww = Dimensions.get('window').width;
    wh = Dimensions.get('window').height;

    var styles = StyleSheet.create({
        btnContainer: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: COLORS.darkgray,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'space-between'
        },

        disabledBtnContainer: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: COLORS.darkgray,
            padding: 15,
            borderRadius: 15,
            justifyContent: 'space-between'
        },

        text: {
            color: COLORS.mainText,
            fontSize: 16,
            fontWeight: "bold"
        },

        disabledText: {
            color: COLORS.lightgray,
            fontSize: 16
        }
    });

    return (
        <TouchableOpacity disabled={disabled} onPress={handlePress} style={disabled ? styles.disabledBtnContainer : styles.btnContainer}>
            <View style={{
                flexDirection: "row",
                height: 0.04 * wh,
            }}>
                <Image source={icon} style={{
                    height: '120%',
                    width: 0.13 * ww,
                    alignSelf: 'center'
                }} />
                <View style={{
                    marginLeft: 0.05 * ww,
                    alignSelf: 'center'
                }}>
                    <Text style={disabled ? styles.disabledText : styles.text}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ListedButton;