import { Text, TouchableOpacity } from "react-native";
import styles from "./seemoreButtonsStyles";

const ScreenHeaderBtn = ({ text, handlePress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };
  
  export default ScreenHeaderBtn;