import { Text, TouchableOpacity } from "react-native";
import styles from "./seemoreButtonsStyles";

const ScreenHeaderBtn = ({ text, handlePress, disabled = false }) => {
  return (
    <TouchableOpacity style={disabled ? styles.disabledButton : styles.button} onPress={handlePress} disabled={disabled}>
      <Text style={disabled ? styles.disabledText : styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;