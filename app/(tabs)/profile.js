import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import commonStyles from "../../styles/common";
import Footer from "../../components/common/footer/Footer"


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
            headerBackVisible: false
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={commonStyles.text}>Profile</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;