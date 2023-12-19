import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

const Home = () => {
    const router = useRouter()
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerStyle: {},
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: null,
          }}
        />

        <Text>Salut</Text>
      </SafeAreaView>
    );
  };
  
  export default Home;