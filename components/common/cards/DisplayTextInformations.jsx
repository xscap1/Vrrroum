import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import commonStyles from "../../../styles/common";

const DisplayTextInformations = ({ title, text }) => {
    return (
        <View style={{ marginTop: 0, marginBottom: 20 }}>
            <Text style={commonStyles.heading}>{title}</Text>
            <View style={commonStyles.subcontainer}>
                <Text style={{ color: COLORS.mainText, alignSelf: 'center', textAlign: 'center' }}>{text}</Text>
            </View>
        </View>
    );
};

export default DisplayTextInformations;