import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./seemoreButtonsStyles";
import { COLORS, SIZES } from "../../../constants";
import { StyleSheet } from "react-native";

const ListedButton = ({ text, handlePress, disabled }) => {

    var styles = StyleSheet.create({
        btnContainer: {
            display: 'flex', 
            flexDirection: 'row', 
            backgroundColor: COLORS.lightgray, 
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
            color: COLORS.lightwhite, 
            fontSize: 16
        },
    
        disabledText: {
            color: COLORS.lightgray, 
            fontSize: 16
        }
    });

    return (
        <TouchableOpacity disabled={disabled} onPress={handlePress} style={ disabled ? styles.disabledBtnContainer : styles.btnContainer }>
            <Text style={disabled ? styles.disabledText : styles.text}>{text}</Text>
            <Text style={disabled ? styles.disabledText : styles.text}>{'\>'}</Text>
        </TouchableOpacity>
    );
};

export default ListedButton;