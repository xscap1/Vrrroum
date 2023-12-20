import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import Trendings from "../components/home/Trendings";
import BestRated from "../components/home/BestRated";
import Categories from "../components/home/Categories";
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <Trendings />
          <BestRated />
          <Categories />
        </ScrollView>
          
        </SafeAreaView>
      </View>
    );
  };
  
  export default Home;