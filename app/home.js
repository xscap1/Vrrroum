import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
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

          <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Salut</Text>
          </View>  

        </SafeAreaView>
      </View>
    );
  };
  
  export default Home;