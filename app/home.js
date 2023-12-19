import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import Trendings from "../components/home/Trendings";

import commonStyles from "../styles/common";

const Home = () => {
    const router = useRouter()
  
    return (
      <View style={commonStyles.body}>
        <SafeAreaView>
          <Stack.Screen
            options={{
              headerStyle: commonStyles.header,
              headerShadowVisible: false,
              headerTitle: "",
              headerBackVisible : false
            }}
          /> 

          <Trendings />

        </SafeAreaView>
      </View>
    );
  };
  
  export default Home;