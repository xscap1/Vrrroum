import { Text, TouchableOpacity } from "react-native";
import styles from "./seemoreButtonsStyles";

const ScreenHeaderBtn = ({ handlePress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text>Découvrir</Text>
      </TouchableOpacity>
    );
  };
  
  export default ScreenHeaderBtn;