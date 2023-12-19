import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../styles/common";

const Trends = () => {
    const router = useRouter()
  
    return (
      <View style={commonStyles.body}>
        <SafeAreaView>
          <Stack.Screen
            options={{
              headerStyle: commonStyles.header,
              headerShadowVisible: false,
              headerTitle: "",
            }}
          /> 

          <Text>TRENDS ECRAN OUI</Text>

        </SafeAreaView>
      </View>
    );
  };
  
  export default Trends;