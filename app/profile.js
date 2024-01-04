import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import commonStyles from "../styles/common";
import Footer from "../components/common/footer/Footer"


const Profile = () => {
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
                <Text style={commonStyles.text}>Profile</Text>
            </ScrollView>
            <View style={{height:'5%'}}>
                <Footer selected={"Profile"}/>
            </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default Profile;