import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import commonStyles from "../../../styles/common";

const DisplayTextInformations = ({ title, text }) => {
    return (
        <View style={{marginTop: 20}}>
            <Text style={commonStyles.heading}>{title}</Text>
            <View style={commonStyles.subcontainer}>
                <Text style={{ color: COLORS.subwhite, alignSelf: 'center', textAlign: 'center' }}>{text}</Text>
            </View>
        </View>
    );
};

export default DisplayTextInformations;