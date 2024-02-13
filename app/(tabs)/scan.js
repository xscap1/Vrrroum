import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../../styles/common";

const Scan = () => {
    const router = useRouter()

    return (
      <View style={commonStyles.body}>
        <SafeAreaView style={commonStyles.safeArea}>
          <Stack.Screen
            options={{
                animation: 'none',
                headerStyle: commonStyles.header,
                headerShadowVisible: false,
                headerTitle: "",
                headerBackVisible : false
            }}
          /> 
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={commonStyles.text}>Scan</Text>
            </ScrollView>
        </SafeAreaView>
      </View>
    );
  };
  
  export default Scan;