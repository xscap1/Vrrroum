import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import Trendings from "../components/home/Trendings";
import BestRated from "../components/home/BestRated";
import Categories from "../components/home/Categories";
import Offers from "../components/home/Offers";
import commonStyles from "../styles/common";
import Footer from "../components/common/footer/Footer"


const Home = () => {
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

          <ScrollView style={{height:'90%'}}showsVerticalScrollIndicator={false}>
            <Offers />
            <Trendings />
            <BestRated />
            <Categories />
          </ScrollView>
          <View style={{height:'5%'}}>
            <Footer selected={"Home"}/>
          </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default Home;